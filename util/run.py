#!/usr/bin/python
import sys
import os
import time
from optparse import OptionParser
import tempfile
from config import *
from util import err
from util import out
from util import warn
from util import fatal
from util import run_jam
from util import run_unpacker
from util import run_repacker
from util import validate_output
from util import validate_value
from util import load_policies
from util import load_policy
from util import load_seeds
from util import load_sources
from util import evaluate_file
from util import get_base
from util import get_exp_path
from util import overwrite_expected
from util import get_lines

def load_testcases(from_dir, default_policy=None):
  cases = []
  paths = load_sources(from_dir, '.js', '.exp.js')
  for flpath in paths:
    base = get_base(flpath)

    # Find any applicable policy files.
    policies = load_policies(from_dir, base) 

    seedfile = load_seeds(from_dir, base)

    specs = (flpath, policies, seedfile)
    cases.append(specs)

  return cases

def run_microbenchmarks(debug=False, overwrite=False, refine=None, synonly=False):
  if refine is None:
    refine = 3
  tot = 0
  tot_ok = 0
  start = time.time()

  for inps in load_testcases(MICROBENCHMARK_DIR, 'simple.policy', defwarn=false):
    srcfl = inps[0]
    poldict = inps[1]
    seeds = inps[2]
    base = get_base(srcfl)

    # Run with each policy file separately.
    for poldesc, polfile in poldict.iteritems():
      opts = []

      synsuf = ''
      if synonly:
        opts.append('-z')
        synsuf = '.syntaxonly'

      # Differentiate the output if policy indexed by a non-numeric key.
      # For example, the policy file jsqrcode.call.policy will be
      # indexed by "call", and the output will be stored separately from
      # the analysis using jsqrcode.get.policy. Alter the .exp filename
      # accordingly.
      if poldesc != '':
        opts.append('--appsuffix')
        opts.append(poldesc)
        exppre = '.' + poldesc
      else:
        exppre = ''

      tot += 1

      ref = refine
      if not synonly:
        if seeds is not None:
          ref = 0
        if base == 'timeout0':
          # Don't waste too much time waiting.
          opts.append('--querytimeout')
          opts.append('5')
          ref = 0

      # Print the name of the file being analyzed.
      jsname = os.path.basename(srcfl)
      out(jsname)

      # Use the union of all policy files for a particular test.
      outp = run_jam(srcfl, [polfile], refine=ref, debug=debug, seeds=seeds, moreopts=opts)

      expsuf = '%s%s.refine%d.exp.js' % (exppre, synsuf, ref)

      exppath = get_exp_path(srcfl, expsuf)
      if process_result(outp, exppath, overwrite):
        tot_ok += 1

  end = time.time()
  tottime = end - start

  vals = (tot_ok, tot, tottime)
  if overwrite:
    out('%d of %d microbenchmark results overwritten; %.2fs\n' % vals)
  else:
    out('%d of %d microbenchmarks successful; %.2fs\n' % vals)
# /run_microbenchmarks
      
def run_benchmarks(debug=False, overwrite=False, refine=None, synonly=False):
  if refine is None:
    refine = 0
  tot = 0
  tot_ok = 0
  start = time.time()

  for inps in load_testcases(BENCHMARK_DIR):
    srcfl = inps[0]
    poldict = inps[1]
    seeds = inps[2]

    # Run with each policy file separately.
    for poldesc, polfile in poldict.iteritems():
      opts = []

      synsuf = ''
      if synonly:
        opts.append('-z')
        synsuf = '.syntaxonly'

      # Differentiate the output if policy indexed by a non-numeric key.
      # For example, the policy file jsqrcode.call.policy will be
      # indexed by "call", and the output will be stored separately from
      # the analysis using jsqrcode.get.policy. Alter the .exp filename
      # accordingly.
      if poldesc != '':
        opts.append('--appsuffix')
        opts.append(poldesc)
        exppre = '.' + poldesc
      else:
        exppre = ''

      base = get_base(srcfl)
      if base in ['phylojive', 'octane', 'googlemaps', 'octane-mandreel',
          'octane-pdf', 'octane-typescript']:
        # These apps are quite large and interprocedural edges explode.
        opts.append('-P')

      # Print the name of the file being analyzed.
      jsname = os.path.basename(srcfl)
      out(jsname)
      tot += 1
      outp = run_jam(srcfl, [polfile], refine=refine, debug=debug, seeds=seeds, moreopts=opts)

      expsuf = '%s%s.refine%d.exp.js' % (exppre, synsuf, refine)

      exppath = get_exp_path(srcfl, expsuf)
      if process_result(outp, exppath, overwrite):
        tot_ok += 1

  end = time.time()
  tottime = end - start

  vals = (tot_ok, tot, tottime)
  if overwrite:
    out('%d of %d benchmark results overwritten; %.2fs\n' % vals)
  else:
    out('%d of %d benchmarks successful; %.2fs\n' % vals)
# /run_benchmarks

def process_result(outp, exppath, overwrite):
  ok = False
  if overwrite:
    stat = overwrite_expected(outp, exppath)
    if stat == "overwritten":
      ok = True
  else:
    stat = validate_output(outp, exppath)
    if stat == "ok":
      ok = True
  expname = os.path.basename(exppath)
  out('%s %s\n' % (expname, stat))
  return ok

class Result():
  def __init__(self):
    self.html_ok = False
    self.js_ok = False

def run_website(url, policies, debug=False, overwrite=False, refine=None, synonly=False):
  if refine is None:
    refine = 0
  results = []

  # Run the unpacker.
  out("Unpacking %s" % url)
  appname, unpackdir = run_unpacker(url, debug=debug, saveall=True)
  if unpackdir is None:
    warn('Unable to retrieve unpack directory: %s' % (url))
    results.append(Result())
    return results
  if appname is None:
    warn('Unable to retrieve application name: %s' % (url))
    results.append(Result())
    return results

  srclist = os.path.join(unpackdir, 'scripts.txt')
  htmlfile = os.path.join(unpackdir, appname + '.html')

  if not os.path.isfile(srclist):
    warn('No JavaScript found at URL: %s' % url)
    results.append(Result())
    return results

  # Run with each policy file separately.
  for poldesc, polfile in policies.iteritems():
    # Generate a new Result for each policy.
    result = Result()
    results.append(result)

    opts = ['-X', '-P', '-N', appname, '-h', htmlfile]

    synsuf = ''
    if synonly:
      opts.append('-z')
      synsuf = '.syntaxonly'

    if poldesc != '':
      opts.append('--appsuffix')
      opts.append(poldesc)
      exppre = '.' + poldesc
    else:
      exppre = ''

    out("Analyzing %s" % appname)
    outp = run_jam(srclist, [polfile], refine=refine, debug=debug, seeds=None, moreopts=opts)

    expsuf = '%s%s.refine%d.exp.js' % (exppre, synsuf, refine)
    exppath = os.path.join(WEBSITE_DIR, appname + expsuf)
    result.js_ok = process_result(outp, exppath, overwrite)

    # Repack the HTML file.

    # Get the generated policy file.
    # %%% Very ugly
    allout = os.listdir(OUTDIR)
    allout.sort()
    gotone = False
    outdir = None
    for od in allout:
      if od.startswith(appname + '-'):
        outdir = os.path.join(OUTDIR, od)
        gotone = True
      elif gotone:
        break
    if outdir is None:
      err('Could not determine JAM output directory: %s' % appname)
      continue
    genpol = os.path.join(outdir, 'policy.js')

    out("Repacking %s" % htmlfile)
    rpout = run_repacker(htmlfile, srclist, unpackdir, polpath=genpol, debug=debug)

    rpfile = os.path.splitext(htmlfile)[0] + '.repack.html'
    rpfl = open(rpfile, 'w')
    rpfl.write(rpout)
    rpfl.close()
    out("Saved to %s" % rpfile)

    rpexpsuf = '%s%s.refine%d.exp.html' % (exppre, synsuf, refine)
    rpexppath = os.path.join(WEBSITE_DIR, appname + rpexpsuf)
    result.html_ok = process_result(rpout, rpexppath, overwrite)

  return results

def run_websites(debug=False, overwrite=False, refine=None, synonly=False):
  tot = 0
  js_ok = 0
  html_ok = 0
  start = time.time()
  
  sites = get_lines(WEBSITE_FILE, comment='#')
  for site in sites:

    policies = load_policies(WEBSITE_DIR, site)
    
    url = 'http://' + site
    results = run_website(url, policies, debug=debug, overwrite=overwrite, refine=refine, synonly=synonly)

    # Track successful results
    tot += len(results)
    for result in results:
      if result.html_ok: html_ok += 1
      if result.js_ok: js_ok += 1

  end = time.time()
  tottime = end - start

  vals = (js_ok, html_ok, tot, tottime)
  if overwrite:
    out('%d/%d of %d website JavaScript/HTML results overwritten; %.2fs\n' % vals)
  else:
    out('%d/%d of %d website JavaScript/HTML tests successful; %.2fs\n' % vals)
# /run_websites

def run_interpreter_tests(debug=False):
  tot = 0
  tot_ok = 0
  for flname in os.listdir(INTERPRETER_TEST_DIR):
    if os.path.splitext(flname)[1] != ".js": continue

    tot += 1
    flpath = os.path.join(INTERPRETER_TEST_DIR, flname)

    out(flname)

    outp = evaluate_file(flpath, debug)
    exppath = get_exp_path(flpath, '.exp')
    ok = validate_value(flpath, outp)

    if ok == 'ok':
      tot_ok += 1
    out('%s %s\n' % (exppath, ok))

  out('%d of %d interpreter tests successful\n' % (tot_ok, tot))

def run_semantics_tests():
  # Semantics tests not organized yet.
  pass

def main():
  parser = OptionParser(usage="%prog")
  parser.add_option('-b', '--benchmarks', action='store_true', default=False, dest='benchmarks', help='analyze benchmark applications')
  parser.add_option('-w', '--websites', action='store_true', default=False, dest='websites', help='end-to-end website analysis')
  parser.add_option('-m', '--micro', action='store_true', default=False, dest='micro', help='analyze microbenchmark applications')
  #parser.add_option('-i', '--interpreter', action='store_true', default=False, dest='interpreter', help='test semantics as an interpreter (currently unsupported)')
  parser.add_option('-e', '--overwrite', action='store_true', default=False, dest='overwrite', help='overwrite expected output')
  #parser.add_option('-s', '--semantics', action='store_true', default=False, dest='semantics', help='test semantics')
  parser.add_option('-g', '--debug', action='store_true', default=False, dest='debug', help='generate debug output')
  parser.add_option('-u', '--url', action='store', default=None, dest='url', help='analyze HTML/JS at given URL')
  parser.add_option('-Y', '--policy', action='store', default=None, dest='policy', help='policy file to apply to URL')
  parser.add_option('-p', '--refine', action='store', default=None, dest='refine', help='maximum of number of predicates to learn')
  parser.add_option('-z', '--syntax-only', action='store_true', default=False, dest='syntaxonly', help='use syntax-only (not semantic) analysis')

  opts, args = parser.parse_args()
    
  if len(args) != 0:
    parser.error("Invalid number of arguments")

  allmods = True
  if opts.benchmarks or opts.micro or opts.websites or opts.url is not None:
    allmods = False

  #if opts.interpreter:
  #  err('Interpreter tests are currently out-of-order')
  #  run_interpreter_tests(opts.debug)
  if opts.url is not None:
    pol = load_policy(opts.policy)
    run_website(opts.url, pol, debug=opts.debug, overwrite=opts.overwrite, refine=opts.refine, synonly=opts.syntaxonly)
  if allmods or opts.micro:
    run_microbenchmarks(opts.debug, opts.overwrite, refine=opts.refine, synonly=opts.syntaxonly)
  if allmods or opts.benchmarks:
    run_benchmarks(opts.debug, opts.overwrite, refine=opts.refine, synonly=opts.syntaxonly)
  if allmods or opts.websites:
    run_websites(opts.debug, opts.overwrite, refine=opts.refine, synonly=opts.syntaxonly)


if __name__ == "__main__":
  main()

