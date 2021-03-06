
package edu.wisc.cs.jam.tx;

import edu.wisc.cs.jam.RuntimeCheck;
import edu.wisc.cs.jam.Predicate;
import edu.wisc.cs.jam.Policy;
import edu.wisc.cs.jam.SourceManager;
import edu.wisc.cs.jam.JAMConfig;
import edu.wisc.cs.jam.Exp;
import edu.wisc.cs.automaton.State;

// This represents a transactional check for a Policy.Edge guarding a
// source code Node. It doesn't directly translate to source code but
// coordinates the addition and removal of Evaluators to Transactions.
public class TransactionCheck extends RuntimeCheck {

  public TransactionCheck(SourceManager src, Exp s, Policy.Edge edge) {
    super(src, s, edge);
  }

  // Enclose the original statement within a transaction.
  public void apply() {
    // Don't do anything if this check is already applied.
    if (isApplied()) return;
    setApplied(true);
  }

  // Remove (unapply) this check from the source code.
  public synchronized void unapply() {
    setApplied(false);
  }

}


