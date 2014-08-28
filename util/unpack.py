#!/usr/bin/python
import sys
import os
import re
import subprocess
from subprocess import PIPE
import shutil
import time
import imp
from optparse import OptionParser
import tempfile
import filecmp
import fnmatch
import traceback
import urlparse
import urllib2
import socket

#
# This script interfaces with the jsunpack utility. It can be accessed
# via SVN at this URL:
#
# http://jsunpack-n.googlecode.com/svn/trunk/
#
# Much of the code in class |Unpacker| is derived from class |jsunpack|
# in jsunpack/jsunpackn.py. Some code is copied to simplify overriding
# complicated methods.
#
# This script loads local or remote HTML files, and collates all
# JavaScript code that is loaded.
#
# JavaScript embedded within PDF files are not currently handled
# because of complications introduced by the jsunpack interface.
#

JAMPKG = os.environ['JAMPKG']
JSUNPACKPKG = os.path.join(JAMPKG, 'util', 'jsunpack')
sys.path.append(os.path.join(JAMPKG, 'tests'))
from util import get_base
from util import get_file_info
from util import get_output_dir
from util import err
from util import warn
sys.path.append(JSUNPACKPKG)
import html
import jsunpackn
import urlattr
from urlattr import urlattr as UrlAttr
import detection
import swf

try:
  from bs4 import BeautifulSoup
except ImportError:
  # BeautifulSoup 4.x not installed trying BeautifulSoup 3.x 
  try:
    from BeautifulSoup import BeautifulSoup
  except ImportError:
    print ('BeautifulSoup not installed')
    exit(-1)

class CodeSnippet:
  
  def __init__(self, tag, url, type, content):
    self.tag = tag
    self.url = url
    self.type = type
    self.content = content

  def getTag(self):
    return self.tag

  def getURL(self):
    return self.url

  def getType(self):
    return self.type

  def getContent(self):
    return self.content

  def appendContent(self, extra):
    self.content = self.content + extra
    return self.content

class HTMLParser(html.Parser):
  
  def jsextract(self, data):
    headers = []
    js = []
    data = re.sub('\x00', '', data)

    try:
      soup = BeautifulSoup(data)
    except:
      err('Fatal error during HTML parsing')
      sys.exit(1)
    
    # Using a strange loop structure to process elements in order.
    for elt in soup.findAll(True):
      par = elt.parent
      removeAttrs = []
      removeTag = False
      for tag, attrib, invals, hformat, outvals in self.html_parse_rules:

        # See if this element matches the current rule.
        if elt not in par.findAll(tag, attrib, recursive=False):
          continue
      
        now = {}

        # Check for negated match
        ignore = False
        for val in invals:
          if val.startswith('!'):
            val = val[1:]
            try:
              v = elt[val]
              ignore = True
              break
            except:
              # The element contains the key.
              # For some reason, |val in elt| does not work.
              pass
        if ignore: continue

        for val in outvals:
          if val == '*':
            now['*'] = ''
          elif val == 'contents':
            try: 
              now['contents'] = ' '.join(map(str, elt.contents))
            except KeyError: 
              now['contents'] = ''
            except UnicodeEncodeError: 
              now['contents'] = ' '.join(map(str, str(elt.contents)))
          elif val == 'name':
            # %%% Unable to reference actual |name| attribute.
            now['name'] = elt.name
          elif val == 'id':
            try: 
              now[val] = str(elt[val])
            except KeyError: 
              now[val] = generateId(soup, elt)
          else:
            try: 
              now[val] = str(elt[val])
            except KeyError: 
              warn('Element does not contain expected attribute: %s' % val)
              now[val] = ''

        # Normalize when assigning to variables.
        for k in now: 
          # If this fails, it means that we are trying to get the
          # result in python.
          if hformat in self.html_definitions:
            if not hformat.startswith('raw'):
              #now[k] = re.sub('([^a-zA-Z0-9])', lambda m: ('\\x%02x' % ord(m.group(1))), now[k])
              # %%% Probably not sufficient escaping.
              #now[k] = re.sub('\\', '\\\\', now[k])
              now[k] = re.sub('\'', '\\\'', now[k])
              now[k] = "'%s'" % now[k]

        # If this fails, it means that we are trying to get the 
        # result in python
        if hformat in self.html_definitions: 
          myfmt = re.sub('^\s+', '', self.html_definitions[hformat]).split('%s')
          if len(myfmt) - 1 == len(outvals):
            lineout = ''
            for i in range(0, len(outvals)):
              lineout += myfmt[i]
              lineout += now[outvals[i]]
            lineout += myfmt[-1] + '\n'

            if elt.name in self.html_filters:
              lineout = re.sub(self.html_filters[elt.name], '', lineout)
            if '*' in self.html_filters:
              lineout = re.sub(self.html_filters['*'], '', lineout, re.I)
            if hformat.startswith('header'):
              headers.append(lineout)
            else:
              if 'src' in now:
                url = now['src']
              else:
                url = None
              js.append(CodeSnippet(elt.name, url, hformat, lineout))

              # Mark some elements for removal.
              if elt.name == 'script':
                removeTag = True
              for attr in ['onclick', 'onload']:
                if attr in attrib:
                  removeAttrs.append(attr)
          else:
            err('Invalid htmlparse.config hformat, parameter count or definition problem: %s' % hformat)
            sys.exit(1)
        else:
          for i in range(0, len(outvals)):
            self.storage.append([hformat, now[outvals[i]]])

      # Clean up the HTML.
      # %%% Should ideally replace with comments.
      if removeTag:
        elt.extract()
      else:
        for attr in removeAttrs:
          del elt[attr]

    return soup.prettify(), headers, js
  # /jsextract

def parseHTML(infile, config):
  hparser = HTMLParser(config)

  fin = open(infile, 'rb')
  data = fin.read()
  fin.close()

  newhtml, header, js = hparser.jsextract(data)
# end parseHTML

class Unpacker(jsunpackn.jsunpack):

  # Create an Unpacker.
  def __init__(self, options) :
    # |start| is the root node in the tree, do not destroy it.
    self.start = urlattr.canonicalize(options.getRoot())
    # |rooturl| contains information about decodings, and continuity 
    # between decodings.
    self.rooturl = {}

    self.url = options.url

    # Keep data in |streams| in case we don't end in one of the end_states.
    self.forceStreams = False
    self.streams = {}
    # Dictionary to avoid repeating information (addressed by unique url)
    self.seen = {} 

    # Detection rules
    self.SIGS = detection.rules(options.rules)
    self.SIGSalt = detection.rules(options.rulesAscii)

    # Options

    # UnpackOpts user options.
    self.OPTIONS = options 
    
    # http_header lastModified
    self.lastModified = ''

    # Set to true by the MZ case.
    # %%% Doesn't seem to be used.
    self.binExists = False

    if self.OPTIONS.veryverbose:
      self.OPTIONS.verbose = True
    if self.OPTIONS.verbose:
      UrlAttr.verbose = True

    self.hparser = HTMLParser(self.OPTIONS.htmlparseconfig)

    loadDir(self.OPTIONS.tmpdir)
    loadDir(self.OPTIONS.ipslog)
    loadDir(self.OPTIONS.decodelog)

    # Done setup, now initialize the decoding.
    self.startTime = time.time()

    # Don't initialize nids twice!
    self.NIDS_INIALIZED = False

    if self.url:
      if not self.OPTIONS.quiet:
        print 'Root URL: %s' % (self.url)
      status, fname = self.fetch(self.url)
      if not self.OPTIONS.quiet:
        print 'Status:', status
    else:
      # Local file decode
      if self.file is not None and self.file not in self.rooturl:
        self.rooturl[self.file] = UrlAttr(self.rooturl, self.start)

      if self.data:
        self.rooturl[self.url].setMalicious(UrlAttr.ANALYZED)
        if self.data.startswith('\xD4\xC3\xB2\xA1'): #pcap
          warn("Unsupported case: %s" % "pcap")
        else:
          self.main_decoder(self.data, myfile)

    if self.OPTIONS.active:
      todo = []
      firstTime = True

      while todo or firstTime:
        firstTime = False
        if (not self.OPTIONS.quiet) and len(todo) > 0:
          print 'Actively fetching %d new URLs' % (len(todo))
        while todo:
          url = todo.pop()
          status, fname = self.fetch(url)
          self.rooturl[url].setMalicious(UrlAttr.ANALYZED)

          if not self.OPTIONS.quiet:
            type = ''
            if self.rooturl[url].type:
              type = '(%s) ' % (self.rooturl[url].type)
            if not self.OPTIONS.quiet:
              print '\tFetching %s URL %s (status: %r)' % (type, url, status)

        for url in self.rooturl:
          if self.rooturl[url].malicious == UrlAttr.NOT_ANALYZED:
            if not (self.rooturl[url].type == 'img' or self.rooturl[url].type == 'input' or self.rooturl[url].type == 'link'):
              todo.append(url)
  # /__init__

  def fetchSingle(self, url, referer):
    if url.startswith('hcp:'):
      warn('Not fetching hcp url: %s' % url)
      return None, None

    if self.url.startswith('127.0.0.1'):
      warn('Not fetching local file: %s', self.url)
      return None, None

    if not referer:
      referer = 'http://' + self.defaultReferer

    try:
      hostname, dstport = self.hostname_from_url(url)

      if self.OPTIONS.proxy and (not self.OPTIONS.currentproxy):
        proxies = self.OPTIONS.proxy.split(',')
        self.OPTIONS.currentproxy = proxies[random.randint(0, len(proxies) - 1)]
        if not self.OPTIONS.quiet:
          print '[fetch config] random proxy %s' % (self.OPTIONS.currentproxy)

      request = urllib2.Request(url)
      request.add_header('Referer', referer)
      request.add_header('User-Agent', 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0)')

      if self.OPTIONS.currentproxy:
        if not self.OPTIONS.quiet:
          print '[fetch config] currentproxy %s' % (self.OPTIONS.currentproxy)
        proxyHandler = urllib2.ProxyHandler({'http': 'http://%s' % (self.OPTIONS.currentproxy) })
        opener = urllib2.build_opener(proxyHandler)
      else:
        opener = urllib2.build_opener()

      try:
        resp = opener.open(request)
        content = resp.read()
        status = resp.getcode()
        respinfo = resp.info()
        ctype = respinfo.gettype()
        if ctype not in ['text/javascript', 'application/x-javascript']:
          warn('Non-JavaScript content type for %s: %s' % (url, ctype))
      except urllib2.HTTPError, error:
        warn('Remote file error: %r' % error.getcode())
        # Don't load 404 error pages.
        # See http://www.jspell.com/ajax-spell-checker.html
        status = error.getcode()
        content = None

    except Exception, e:
      warn('Failure: ' + str(e))
      status = 500
      content = None

    return status, content
  # /fetchSingle

  def fetch(self, url):
    if url.startswith('hcp:'):
      warn('Not fetching hcp url: %s' % url)
      return None

    self.url = urlattr.canonicalize(url)

    #self.rooturl must already have an entry for url
    if not self.url in self.rooturl:
      self.rooturl[self.url] = UrlAttr(self.rooturl, self.url)

    if self.url.startswith('127.0.0.1'):
      self.rooturl[self.url].malicious = UrlAttr.DONT_ANALYZE
      warn('Not fetching local file: %s', self.url)
      return None

    refer = ''
    for parenturl in self.rooturl:
      for type, child in self.rooturl[parenturl].children:
        if url == child:
          refer = parenturl

    if (not refer) or refer.startswith(self.OPTIONS.outdir):
      refer = self.defaultReferer
    self.rooturl[self.url].status = '\t(referer=%s)\n' % (refer)
    fname = ''
    try:
      hostname, dstport = self.hostname_from_url(url)

      if self.OPTIONS.proxy and (not self.OPTIONS.currentproxy):
        proxies = self.OPTIONS.proxy.split(',')
        self.OPTIONS.currentproxy = proxies[random.randint(0, len(proxies) - 1)]
        if not self.OPTIONS.quiet:
          print '[fetch config] random proxy %s' % (self.OPTIONS.currentproxy)

      request = urllib2.Request('http://' + url)
      request.add_header('Referer', 'http://' + refer)
      request.add_header('User-Agent', 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0)')

      if self.OPTIONS.currentproxy:
        if not self.OPTIONS.quiet:
          print '[fetch config] currentproxy %s' % (self.OPTIONS.currentproxy)
        proxyHandler = urllib2.ProxyHandler({'http': 'http://%s' % (self.OPTIONS.currentproxy) })
        opener = urllib2.build_opener(proxyHandler)
      else:
        opener = urllib2.build_opener()

      try:
        remote = opener.open(request).read()
      except urllib2.HTTPError, error:
        warn('Remote file error: %r' % error.getcode())
        # If not suppressed, this causes an infinite regress.
        # See http://www.jspell.com/ajax-spell-checker.html
        #remote = error.read()
        remote = ''

      if len(remote) > 0:
        if len(remote) > 31457280:
          warn('Not fetching large file: %s' % self.url)
          return None
        try:
          fname = self.createFile('fetch', remote)
          self.rooturl[self.url].status += '\tsaved %d bytes %s\n' % (len(remote), fname)

          resolved = socket.gethostbyname(hostname)
          self.rooturl[self.url].tcpaddr = [['0.0.0.0', 0], [resolved, dstport]]
        except Exception, e:
          warn("Lookup failure: %r" % e)
          warn(traceback.format_exc())
        self.main_decoder(remote, url)
      else:
        self.rooturl[self.url].malicious = UrlAttr.ANALYZED

    except Exception, e:
      self.rooturl[self.url].status += '\tfailure: ' + str(e) + '\n'
      self.rooturl[self.url].malicious = UrlAttr.DONT_ANALYZE
      err(traceback.format_exc())

    return self.rooturl[self.url].status, fname
  # end fetch

  def extractJS(self, content):
    #return values are:
    #([headers], [scripts])
    try:
      newhtml, headers, js = self.hparser.jsextract(content)
    except Exception, e:
      newhtml = ''
      headers = []
      js = []
      err('Error in extractJS: %s' % str(e))
    
    content = ''
    for jscode in js:
      typ = jscode.getType()
      tag = jscode.getTag()
      url = jscode.getURL()
      if url is None:
        url = self.start
      else:
        # Get the absolute URL relative to the starting URL.
        baseurl = self.start
        if self.OPTIONS.protocol is not None:
          baseurl = self.OPTIONS.protocol + '://' + baseurl
        url = urlparse.urljoin(baseurl, url)
        
      if typ in ['rawSCRIPT', 'eventBODYONLOAD', 'eventIMAGEONLOAD', 'eventONCLICK']:
        content += '// %s, %s: %s\n%s\n' % (typ, tag, url, normalizeText(jscode.getContent()))
      elif typ in ['rawELEMENT']:
        content += '// %s, %s: %s\n' % (typ, tag, url)
        if tag == 'script':
          if not self.OPTIONS.quiet:
            print 'Loading URL:', url
          status, data = self.fetchSingle(url, baseurl)
          content += '// status: ' + str(status) + '\n'
          if data is not None:
            content += normalizeText(data) + '\n'
      else:
        content += '// %s, %s: %s\n' % (typ, tag, url)
      # Separate file content with an additional line.
      content += '\n'

    headerstr = ''
    for header in headers:
      # |headers| contains JavaScript for DOM setup.
      # %%% Not currently used. Could be very useful if improved.
      headerstr += '// %s\n%s\n' % (self.url, header)

    urlbase = self.getURLBase(self.start)
    if len(content) > 0:
      self.createFile('extract_' + urlbase, content)
    if len(headerstr) > 0:
      self.createFile('headers_' + urlbase, headerstr)
    if len(newhtml) > 0:
      self.createFile('html_' + urlbase, newhtml)

  # end extractJS

  def main_decoder(self, data, url, tcpaddr=[], lastModified=''):
    url = urlattr.canonicalize(url)
    self.url = url
    self.lastModified = lastModified
    if not self.url in self.rooturl:
      self.rooturl[self.url] = UrlAttr(self.rooturl, self.url, tcpaddr) #initialization
    self.rooturl[self.url].setMalicious(UrlAttr.ANALYZED)
    level = 0

    if self.OPTIONS.saveallfiles:
      # Save all file streams.
      self.createFile('stream', data)

    isMZ = False
    if data.startswith('MZ'):
      warn('MZ case was hit, don\'t know what that is.')
      isMZ = True
      self.rooturl[self.url].filetype = 'MZ'
      self.binExists = True
      if self.OPTIONS.saveallexes:
        sha1exe = self.createFile('executable', data)
      else:
        self.log(0, '[%d] executable file' % level)

    swfjs = ''
    if data.startswith('CWS') or data.startswith('FWS'):
      # This case is triggered by HTML embed (and object?) tags that
      # pull in Flash scripts.
      #warn('CWS/FWS case was hit')
      isSWF = True
      self.rooturl[self.url].filetype = 'SWF'

      msgs, urls = swf.swfstream(data)
      for url in urls:
        swfjs_obj = re.search('javascript:(.*)', url, re.I)
        if swfjs_obj:
          swfjs += swfjs_obj.group(1) + '\n'
        else:
          # URL only
          multi = re.findall('https?:\/\/([^\s<>\'"]+)', url)
          if multi:
            for m in multi:
              self.rooturl[self.url].setChild(m, 'swfurl')
          else:
            #no http
            if url.startswith('/'):
              #relative root path
              firstdir = re.sub('([^/])/.*$', '\\1', self.url)
              m = firstdir + url
            else:
              #relative preserve directory path
              lastdir = re.sub('/[^\/]*$', '/', self.url)
              m = lastdir + url
            self.rooturl[self.url].setChild(m, 'swfurl')
    else:
      isSWF = False

    self.extractJS(data)
  # /main_decoder

  def createFile(self, base, content, ext='txt'):
    if len(content) == 0:
      return None
    outdir = self.OPTIONS.outdir
    # No output directory means don't output anything.
    if not outdir:
      return None

    if ext:
      filename = base + '.' + ext
    else:
      filename = base
    outfile = os.path.join(outdir, filename)

    if not os.path.isdir(outdir):
      os.mkdir(outdir)
    if os.path.isdir(outdir):
      ffile = open(outfile, 'w')
      print >> ffile, content.encode('utf-8')
      ffile.close()
    return outfile
  # /createFile

  def getURLBase(self, url):
    urlparts = urlparse.urlparse(url)
    # Split the path component.
    urlbase = urlparts[2].split('/')[-1]
    return urlbase
  # /getURLBase

  def log(self, num, msg):
    self.rooturl[self.url].log(self.OPTIONS.verbose, num, msg)
  # /log

# /Unpacker
 
class UnpackOpts:
  RULES = None
  fin = open(os.path.join(JSUNPACKPKG, 'rules'), 'r')
  if fin:
    RULES = fin.read()
    fin.close()

  RULESASCII = None
  fin = open(os.path.join(JSUNPACKPKG, 'rules.ascii'), 'r')
  if fin:
    RULESASCII = fin.read()
    fin.close()

  HTMLPARSECONFIG = None
  HTMLCFGFILE = os.path.join(JSUNPACKPKG, 'htmlparse.config')
  fin = open(HTMLCFGFILE, 'r')
  if fin:
    HTMLPARSECONFIG = fin.read()
    fin.close()

  CONFIGFILE = os.path.join(JSUNPACKPKG, 'options.config')
  PREFILE = os.path.join(JSUNPACKPKG, 'pre.js')
  POSTFILE = os.path.join(JSUNPACKPKG, 'post.js')

  def __init__(self, infile):
    # Show [nothing found] entries.
    UrlAttr.verbose = True 

    if isURL(infile):
      self.url = getAddress(infile)
      self.protocol = getProtocol(infile)
      self.file = None
      self.data = None
      self.base = self.url
      self.ext = getExtension(self.url)
    else:
      self.file = infile
      fin = open(self.file, 'rb')
      if fin:
        self.data = fin.read()
        fin.close()
      self.url = None
      self.protocol = None
      info = get_file_info(infile)
      self.base = info['app']
      self.ext = info['ext']

    self.urlfetch = self.url # Used by jsunpackn.py
    self.rules = UnpackOpts.RULES
    self.rulesAscii = UnpackOpts.RULESASCII
    self.active = False
    self.quiet = not VERBOSE
    self.verbose = VERBOSE
    self.veryverbose = VERBOSE
    self.configfile = UnpackOpts.CONFIGFILE
    self.htmlparse = UnpackOpts.HTMLCFGFILE
    self.htmlparseconfig = UnpackOpts.HTMLPARSECONFIG
    self.interface = False
    self.outdir = get_output_dir(os.path.join(JAMPKG, 'unpacked'), self.base)
    self.decodelog = os.path.join(self.outdir, 'decoded.log')
    self.ipslog = os.path.join(self.outdir, 'ip.log')
    self.log_ips = self.ipslog # Used by jsunpackn.py
    self.tmpdir = os.path.join(self.outdir, 'tmp')
    self.fasteval = False
    self.saveallfiles = False
    self.saveallexes = False
    self.proxy = None
    self.currentproxy = None
    self.timeout = 30
    self.redoevaltime = 1
    self.maxruntime = 0
    self.pre = UnpackOpts.PREFILE
    self.post = UnpackOpts.POSTFILE
    self.debug = False
    self.nojs = False
    
  def __str__(self):
    return str(self.__dict__)

  def getRoot(self):
    if self.url is not None:
      return self.url
    else:
      assert self.file is not None, 'Neither url nor file is set'
      return self.file

# end UnpackOpts

def isURL(uri):
  return getProtocol(uri) in ['http', 'https']
# end isURL

def getProtocol(url):
  parts = re.split('://', url, 1)
  if len(parts) == 1:
    return ''
  prot = parts[0].lower()
  return prot
# end getProtocol

# Return the address part (without the preceding protocol).
def getAddress(url):
  # %%% Handle other protocols.
  prot = getProtocol(url)
  addr = re.sub('^' + prot + '://', '', url, flags=re.IGNORECASE)
  return addr
# end getAddress

def getDomain(addr):
  # Assumes the protocol prefix has been removed.
  parts = re.split('/', addr)
  dom = parts[0]
  return dom
# end getDomain

def getExtension(addr):
  parts = re.split('/', addr)
  subparts = re.split('\.', parts[-1])
  ext = subparts[-1]
  return ext
# end getExtension

def loadDir(filename):
  absdir = os.path.abspath(os.path.dirname(filename))
  if not os.path.isdir(absdir):
    try:
      os.makedirs(absdir)
    except Exception, e:
      err(e)
      sys.exit(1)
  return absdir
# end loadDir

# Load all JavaScript from loaded by a particular HTML file.
def loadFile(infile):
  opts = UnpackOpts(infile)

  try:
    js = Unpacker(opts)
  except Exception, e:
    err("%s: %s" % (str(e), infile))
    err(traceback.format_exc())
    return False

  #for htmlfile in htmlfiles:
  #  output += parseHTML(htmlfile, htmlparseconfig)

  #if len(output) > 0:
  #  if opts.outfile is None:
  #    outfile = '%s.out' % infile
  #  else:
  #    outfile = opts.outfile
  #  fout = open(outfile, 'wb')
  #  fout.write(output)
  #  fout.close()
  #  print 'Wrote %s.out (%d bytes)' % (infile, len(output))
  #else:
  #  print 'Nothing parsed for %s' % infile

  #return js
# end loadFile

NEXT_ID = 0
def generateId(soup, elt):
  global NEXT_ID
  newid = 'unpack' + str(NEXT_ID)
  NEXT_ID += 1
  while soup.find(id=newid) is not None:
    newid = 'unpack' + str(NEXT_ID)
    NEXT_ID += 1
  elt['id'] = newid
  return newid

def normalizeText(s):
  s = re.sub('\r\n', '\n', s)
  s = re.sub('\r', '\n', s)
  s = s.decode('utf-8')
  return s

def main():
  parser = OptionParser(usage="%prog URL|HTML")
  parser.add_option('-f', '--overwrite', action='store_true', default=False, dest='overwrite', help='overwrite existing files')
  parser.add_option('-v', '--verbose', action='store_true', default=False, dest='verbose', help='generate verbose output')

  opts, args = parser.parse_args()

  if len(args) < 1:
    parser.error("Invalid number of arguments")

  #global cfg
  #cfg = imp.load_source("cfg", args[0])
  #assert os.path.isdir(cfg.SOURCEDIR), "Source path %s doesn't exist." % cfg.SOURCEDIR

  global OVERWRITE, VERBOSE
  OVERWRITE = opts.overwrite
  VERBOSE = opts.verbose

  HTMLParser.debug = VERBOSE

  output = ""
  for infile in args:
    loadFile(infile)

if __name__ == "__main__":
  main()



