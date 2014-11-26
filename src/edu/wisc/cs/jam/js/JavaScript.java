package edu.wisc.cs.jam.js;

import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;
import java.util.List;

import java.io.IOException;
import java.io.File;

import edu.wisc.cs.jam.tx.TxManager;
import edu.wisc.cs.jam.Semantics;
import edu.wisc.cs.jam.PolicyLanguage;
import edu.wisc.cs.jam.CheckManager;
import edu.wisc.cs.jam.ControlAutomaton;
import edu.wisc.cs.jam.SourceManager;
import edu.wisc.cs.jam.Policy;
import edu.wisc.cs.jam.Language;
import edu.wisc.cs.jam.JAM;
import edu.wisc.cs.jam.Dbg;
import edu.wisc.cs.jam.FileUtil;

import edu.wisc.cs.jam.html.HTMLSource;

public class JavaScript implements Language {

  private JSSemantics sem;
  private JSPolicyLanguage pl;
  
  // %%% Conceptually, shouldn't need the source file.
  @Override
  public Semantics newSemantics(SourceManager sm) {
    assert sem == null;
    sem = new JSSemantics(sm);
    sem.loadFunctionFacts();
    return sem;
  }

  @Override
  public Semantics semantics() {
    assert sem != null;
    return sem;
  }

  @Override
  public PolicyLanguage policyLanguage() {
    if (pl == null) {
      pl = new JSPolicyLanguage();
    }
    return pl;
  }

  @Override
  public CheckManager newCheckManager(SourceManager sm, Policy pol) {
    return new TxManager(sm, pol);
  }

  @Override
  public ControlAutomaton newControlAutomaton(SourceManager sm, CheckManager cm) {
    ControlAutomaton caut = null;
    if (JAM.Opts.intraprocedural) {
      caut = new JSControlStructure(sm, cm);
    } else {
      caut = new JSInterproceduralControlStructure(sm, cm);
    }
    sm.setControlAutomaton(caut);
    return caut;
  }

  @Override
  public SourceManager newSourceManager(List<String> srcPaths) {
    SourceManager jsman = new JSSourceManager();
    // Cull duplicate source files since Closure can't handle them.
    Set<String> sfs = new HashSet<String>();
    for (String srcpath : srcPaths) {
      if (JAM.Opts.sourceIsList) {
        List<String> lines = null;
        try {
          lines = FileUtil.getLinesFromFile(srcpath, "#");
        } catch (IOException ex) {
          Dbg.err("Unable to read source list: " + srcpath);
          continue;
        }
        for (String line : lines) {
          String[] parts = line.split(":");
          if (parts.length != 3) {
            Dbg.warn("Invalid format for source list line: " + line);
            continue;
          }
          String srctype = parts[0];
          String srcid = parts[1];
          String relpath = parts[2];

          // The path is assumed to be relative to the list file itself.
          File listfile = new File(srcpath);
          String srctop = listfile.getParent();
          File absfile = new File(srctop, relpath);
          String abspath = absfile.getAbsolutePath();
          if (sfs.contains(abspath)) {
            Dbg.warn("Omitting duplicate source file: " + abspath);
            continue;
          }
          sfs.add(abspath);

          // These must be wrapped in a function to prevent "invalid
          // return" errors.
          boolean wrap = srctype.startsWith("script.event.") || srctype.equals("script.href");
          JSSource newsrc = new JSSource(abspath, wrap);
          
          newsrc.setRelativePath(relpath);
          jsman.addSource(newsrc);
        }
      } else {
        File sf = new File(srcpath);
        String abspath = sf.getAbsolutePath();
        if (sfs.contains(abspath)) {
          Dbg.warn("Omitting duplicate source file: " + abspath);
          continue;
        }
        sfs.add(abspath);
        jsman.addSource(new JSSource(abspath, false));
      }
    }
    if (JAM.Opts.htmlFile != null) {
      jsman.addSource(new HTMLSource(JAM.Opts.htmlFile));
    }
    return jsman;
  }

}
