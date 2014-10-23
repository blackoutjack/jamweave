// sms2-codon-usage.js
function v6() {
  document.forms[0].elements[0].value = " ";
  document.forms[0].elements[4].value = " ";
  return;
}
function v5() {
  try {
    codonUsage(document);
  } catch (e$$5) {
    alert("The following error was encountered: " + e$$5);
  }
  return;
}
function v4() {
  document.main_form.main_submit.focus();
  return;
}
function addReturns(sequence) {
  function v0(str$$6, p1, offset$$8, s$$2) {
    return p1 + "\n";
  }
  sequence = JAM.call(sequence.replace, sequence, [/(.{60})/g, v0], JAM.policy.p27);
  return sequence;
}
function checkAlign(arrayOfTitles, arrayOfSequences) {
  var lengthOfAlign = arrayOfSequences[0].length;
  if (arrayOfSequences.length < 2) {
    alert("Please enter an alignment consisting of at least two sequences.");
    return false;
  }
  var i$$1 = 0;
  var v14 = i$$1 < arrayOfTitles.length;
  for (;v14;) {
    introspect(JAM.policy.p26) {
      var v865 = arrayOfTitles[i$$1]
    }
    var v668 = JAM.call(v865.search, v865, [/\S/], JAM.policy.p28) == -1;
    if (!v668) {
      introspect(JAM.policy.p26) {
        var v866 = arrayOfSequences[i$$1]
      }
      v668 = JAM.call(v866.search, v866, [/\S/], JAM.policy.p28) == -1;
    }
    var v401 = v668;
    if (!v401) {
      introspect(JAM.policy.p26) {
        var v794 = arrayOfSequences[i$$1]
      }
      v401 = v794.length != lengthOfAlign;
    }
    if (v401) {
      alert("There is a problem with the alignment format.");
      return false;
    }
    i$$1 = i$$1 + 1;
    v14 = i$$1 < arrayOfTitles.length;
  }
  return true;
}
function checkCodonTable(codonTable) {
  var v867 = JAM.call(codonTable.search, codonTable, [/AmAcid/], JAM.policy.p28) == -1;
  if (!v867) {
    v867 = JAM.call(codonTable.search, codonTable, [/Codon/], JAM.policy.p28) == -1;
  }
  var v795 = v867;
  if (!v795) {
    v795 = JAM.call(codonTable.search, codonTable, [/Number/], JAM.policy.p28) == -1;
  }
  var v671 = v795;
  if (!v671) {
    v671 = JAM.call(codonTable.search, codonTable, [/\/1000/], JAM.policy.p28) == -1;
  }
  var v403 = v671;
  if (!v403) {
    v403 = JAM.call(codonTable.search, codonTable, [/Fraction\s*\.\./], JAM.policy.p28) == -1;
  }
  if (v403) {
    alert("The codon table has been entered incorrectly.");
    return false;
  }
  return true;
}
function checkFormElement(formElement) {
  var v674 = formElement.value;
  if (JAM.call(v674.search, v674, [/\S/], JAM.policy.p28) == -1) {
    alert("Please enter some text.");
    return false;
  }
  return true;
}
function checkGeneticCode(arrayOfPatterns) {
  var z$$2 = 0;
  var codon = "";
  var oneMatch = false;
  var testSequence = "gggggaggtggcgaggaagatgacgtggtagttgtcgcggcagctgccaggagaagtagcaagaaaaataacatgataattatcacgacaactacctggtgatgttgctagtaatattacttgttatttttctcgtcatcttcccggcgacgtcgccagcaacatcacctgctacttctcccgccacctccc";
  var v19 = z$$2 < arrayOfPatterns.length;
  for (;v19;) {
    introspect(JAM.policy.p26) {
      var v675 = arrayOfPatterns[z$$2]
    }
    if (JAM.call(v675.search, v675, [/^\s*\/[a-zA-Z\|\[\]]+\/=[a-zA-Z\*]/], JAM.policy.p28) == -1) {
      alert("Genetic code error: one or more patterns have been entered incorrectly.");
      return false;
    }
    introspect(JAM.policy.p26) {
      var v676 = arrayOfPatterns[z$$2]
    }
    if (moreExpressionCheck(v676) == false) {
      alert("Genetic code error: one or more patterns have been entered incorrectly.");
      return false;
    }
    z$$2 = z$$2 + 1;
    v19 = z$$2 < arrayOfPatterns.length;
  }
  var geneticCodeMatchResult = new Array(arrayOfPatterns.length);
  var geneticCodeMatchExp = new Array(arrayOfPatterns.length);
  var j = 0;
  var v28 = j < arrayOfPatterns.length;
  for (;v28;) {
    var v22 = geneticCodeMatchExp;
    var v23 = j;
    introspect(JAM.policy.p26) {
      var v798 = arrayOfPatterns[j]
    }
    var v410 = JAM.call(v798.match, v798, [/\/.+\//], JAM.policy.p28) + "gi";
    if (JAM.isEval(eval)) {
      var v1264 = eval("introspect(JAM.policy.pFull) { " + v410 + " }")
    } else {
      var v1264 = JAM.call(eval, null, [v410])
    }
    introspect(JAM.policy.p13) {
      v22[v23] = v1264;
    }
    var v24 = geneticCodeMatchResult;
    var v25 = j;
    introspect(JAM.policy.p26) {
      var v678 = arrayOfPatterns[j]
    }
    var v1265 = JAM.call(v678.match, v678, [/=[a-zA-Z\*]/], JAM.policy.p28).toString();
    introspect(JAM.policy.p13) {
      v24[v25] = v1265;
    }
    var v26 = geneticCodeMatchResult;
    var v27 = j;
    introspect(JAM.policy.p26) {
      var v412 = geneticCodeMatchResult[j]
    }
    var v1266 = JAM.call(v412.replace, v412, [/=/g, ""], JAM.policy.p27);
    introspect(JAM.policy.p13) {
      v26[v27] = v1266;
    }
    j = j + 1;
    v28 = j < arrayOfPatterns.length;
  }
  var i$$2 = 0;
  var v35 = i$$2 <= testSequence.length - 3;
  for (;v35;) {
    codon = JAM.call(testSequence.substring, testSequence, [i$$2, i$$2 + 3], JAM.policy.p27);
    j = 0;
    var v33 = j < geneticCodeMatchExp.length;
    for (;v33;) {
      introspect(JAM.policy.p26) {
        var v680 = geneticCodeMatchExp[j]
      }
      if (JAM.call(codon.search, codon, [v680], JAM.policy.p39) != -1) {
        if (oneMatch == true) {
          alert("Genetic code error: more than one amino acid is coded by the codon: " + codon + ".");
          return false;
        }
        oneMatch = true;
      }
      j = j + 1;
      v33 = j < geneticCodeMatchExp.length;
    }
    if (oneMatch == false) {
      alert("The genetic code expressions are missing a codon.");
      return false;
    }
    oneMatch = false;
    i$$2 = i$$2 + 3;
    v35 = i$$2 <= testSequence.length - 3;
  }
  return true;
}
function checkGroupInput(arrayOfPatterns$$1) {
  var z$$3 = 0;
  var v37 = z$$3 < arrayOfPatterns$$1.length;
  for (;v37;) {
    introspect(JAM.policy.p26) {
      var v682 = arrayOfPatterns$$1[z$$3]
    }
    if (JAM.call(v682.search, v682, [/[^acdefghiklmnpqrstvwyz]/i], JAM.policy.p28) != -1) {
      alert("One or more groups have been entered incorrectly.");
      return false;
    }
    z$$3 = z$$3 + 1;
    v37 = z$$3 < arrayOfPatterns$$1.length;
  }
  var i$$3 = 0;
  var v41 = i$$3 < arrayOfPatterns$$1.length;
  for (;v41;) {
    introspect(JAM.policy.p26) {
      var v683 = arrayOfPatterns$$1[i$$3]
    }
    var re = new RegExp("[" + v683 + "]", "gi");
    var j$$1 = i$$3 + 1;
    var v40 = j$$1 < arrayOfPatterns$$1.length;
    for (;v40;) {
      introspect(JAM.policy.p26) {
        var v684 = arrayOfPatterns$$1[j$$1]
      }
      if (JAM.call(v684.search, v684, [re], JAM.policy.p39) != -1) {
        alert("The same amino acid is in more than one similarity group.");
        return false;
      }
      j$$1 = j$$1 + 1;
      v40 = j$$1 < arrayOfPatterns$$1.length;
    }
    i$$3 = i$$3 + 1;
    v41 = i$$3 < arrayOfPatterns$$1.length;
  }
  return true;
}
function checkRestPatterns(arrayOfPatterns$$2) {
  var z$$4 = 0;
  var v44 = z$$4 < arrayOfPatterns$$2.length;
  for (;v44;) {
    introspect(JAM.policy.p26) {
      var v685 = arrayOfPatterns$$2[z$$4]
    }
    if (JAM.call(v685.search, v685, [/^\s*\/[acgturyswkmbdhvn\[\]]+\/\s+\([^\/]+\)\d+/i], JAM.policy.p28) == -1) {
      alert("One or more patterns have been entered incorrectly.");
      return false;
    }
    introspect(JAM.policy.p26) {
      var v686 = arrayOfPatterns$$2[z$$4]
    }
    if (moreExpressionCheck(v686) == false) {
      alert("One or more patterns have been entered incorrectly.");
      return false;
    }
    z$$4 = z$$4 + 1;
    v44 = z$$4 < arrayOfPatterns$$2.length;
  }
  return true;
}
function checkSequenceLength(text$$7, maxInput) {
  var v799 = getSequenceFromFasta(text$$7);
  if (JAM.call(v799.replace, v799, [/[^A-Za-z]/g, ""], JAM.policy.p27).length > maxInput) {
    alert("Please enter a sequence consisting of less than or equal to " + maxInput + " characters.");
    return false;
  } else {
    return true;
  }
  return;
}
function checkTextLength(text$$8, maxInput$$1) {
  if (text$$8.length > maxInput$$1) {
    alert("Please enter text consisting of less than or equal to " + maxInput$$1 + " characters.");
    return false;
  } else {
    return true;
  }
  return;
}
function complement(dnaSequence) {
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/g/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/c/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "c"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "g"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/G/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/C/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "C"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "G"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/a/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/t/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "t"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "a"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/A/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/T/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "T"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "A"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/u/g, "a"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/U/g, "A"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/r/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/y/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "y"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "r"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/R/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/Y/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "Y"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "R"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/k/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/m/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "m"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "k"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/K/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/M/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "M"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "K"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/b/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/v/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "v"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "b"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/B/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/V/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "V"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "B"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/d/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/h/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "h"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "d"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/D/g, "1"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/H/g, "2"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/1/g, "H"], JAM.policy.p27);
  dnaSequence = JAM.call(dnaSequence.replace, dnaSequence, [/2/g, "D"], JAM.policy.p27);
  return dnaSequence;
}
function closeForm() {
  var v49 = outputWindow.document;
  JAM.call(v49.write, v49, ["</form>"], JAM.policy.p24);
  return true;
}
function closePre() {
  var v50 = outputWindow.document;
  JAM.call(v50.write, v50, ["</div>"], JAM.policy.p24);
  var v51 = outputWindow.document;
  JAM.call(v51.write, v51, ["</pre>\n"], JAM.policy.p24);
  return;
}
function closeTextArea() {
  var v52 = outputWindow.document;
  JAM.call(v52.write, v52, ["</textarea>"], JAM.policy.p24);
  return true;
}
function closeWindow() {
  var v53 = outputWindow.document;
  JAM.call(v53.write, v53, ["</body>\n</html>\n"], JAM.policy.p24);
  outputWindow.status = "Done.";
  outputWindow.document.close();
  return true;
}
function convertDegenerates(sequence$$1) {
  sequence$$1 = sequence$$1.toLowerCase();
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/t/g, "[TU]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/r/g, "[AGR]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/y/g, "[CTUY]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/s/g, "[GCS]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/w/g, "[ATUW]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/k/g, "[GTUK]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/m/g, "[ACM]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/b/g, "[CGTUBSKY]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/d/g, "[AGTUDRKW]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/h/g, "[ACTUHMYW]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/v/g, "[ACGVSMR]"], JAM.policy.p27);
  sequence$$1 = JAM.call(sequence$$1.replace, sequence$$1, [/n/g, "[ACGTURYSWKMBDHVN]"], JAM.policy.p27);
  return sequence$$1;
}
function earlyCheckAlign(alignArray) {
  if (alignArray.length < 3) {
    alert("There is a problem with the alignment format.");
    return false;
  }
  var i$$4 = 1;
  var v57 = i$$4 < alignArray.length;
  for (;v57;) {
    introspect(JAM.policy.p26) {
      var v688 = alignArray[i$$4]
    }
    if (JAM.call(v688.search, v688, [/[^\s]+\s/], JAM.policy.p28) == -1) {
      alert("There is a problem with the alignment format.");
      return false;
    }
    i$$4 = i$$4 + 1;
    v57 = i$$4 < alignArray.length;
  }
  return true;
}
function filterAlignSeq(alignSeq) {
  alignSeq = JAM.call(alignSeq.replace, alignSeq, [/[^abcdefghiklmnpqrstvwxyz\.\-]/gi, ""], JAM.policy.p27);
  return alignSeq;
}
function filterFastaTitle(sequenceTitle) {
  sequenceTitle = JAM.call(sequenceTitle.replace, sequenceTitle, [/\s{2,}/g, " "], JAM.policy.p27);
  sequenceTitle = JAM.call(sequenceTitle.replace, sequenceTitle, [/^\s*/g, ""], JAM.policy.p27);
  sequenceTitle = JAM.call(sequenceTitle.replace, sequenceTitle, [/[\f\n\r\t]+$/g, "\n"], JAM.policy.p27);
  return JAM.call(sequenceTitle.replace, sequenceTitle, [/[\<\>]\n/gi, ""], JAM.policy.p27);
}
function getArrayOfFasta(sequenceData) {
  var arrayOfFasta = new Array;
  var matchArray;
  var re$$1 = /\>[^\>]+/g;
  if (JAM.call(sequenceData.search, sequenceData, [/\>[^\f\n\r]+[\f\n\r]/], JAM.policy.p28) != -1) {
    var v59 = matchArray = JAM.call(re$$1.exec, re$$1, [sequenceData], JAM.policy.p39);
    for (;v59;) {
      JAM.call(arrayOfFasta.push, arrayOfFasta, [matchArray[0]], JAM.policy.p39);
      v59 = matchArray = JAM.call(re$$1.exec, re$$1, [sequenceData], JAM.policy.p39);
    }
  } else {
    arrayOfFasta[0] = sequenceData;
  }
  return arrayOfFasta;
}
function getFastaTitleFromTitleAndSequence(fastaSequenceTitle, sequence$$2) {
  var stringToReturn = "&gt;results for " + sequence$$2.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitle.search, fastaSequenceTitle, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn = stringToReturn + '"' + fastaSequenceTitle + '"';
  }
  stringToReturn = stringToReturn + ' starting "' + JAM.call(sequence$$2.substring, sequence$$2, [0, 10], JAM.policy.p23) + '"';
  return stringToReturn + "\n";
}
function getFuzzySearchTitle(fastaSequenceTitleOne, sequenceOne, fastaSequenceTitleTwo, sequenceTwo) {
  var stringToReturn$$1 = "Search results for " + sequenceOne.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitleOne.search, fastaSequenceTitleOne, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn$$1 = stringToReturn$$1 + '"' + fastaSequenceTitleOne + '"';
  }
  stringToReturn$$1 = stringToReturn$$1 + ' starting "' + JAM.call(sequenceOne.substring, sequenceOne, [0, 10], JAM.policy.p23) + '"\n';
  stringToReturn$$1 = stringToReturn$$1 + "and " + sequenceTwo.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitleTwo.search, fastaSequenceTitleTwo, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn$$1 = stringToReturn$$1 + '"' + fastaSequenceTitleTwo + '"';
  }
  stringToReturn$$1 = stringToReturn$$1 + ' starting "' + JAM.call(sequenceTwo.substring, sequenceTwo, [0, 10], JAM.policy.p23) + '"';
  return'<div class="info">' + stringToReturn$$1 + "</div>\n";
}
function getGeneticCodeMatchExp(arrayOfPatterns$$3) {
  var geneticCodeMatchExp$$1 = new Array(arrayOfPatterns$$3.length);
  var j$$2 = 0;
  var v77 = j$$2 < arrayOfPatterns$$3.length;
  for (;v77;) {
    var v75 = geneticCodeMatchExp$$1;
    var v76 = j$$2;
    introspect(JAM.policy.p26) {
      var v800 = arrayOfPatterns$$3[j$$2]
    }
    var v459 = JAM.call(v800.match, v800, [/\/.+\//], JAM.policy.p28) + "gi";
    if (JAM.isEval(eval)) {
      var v1267 = eval("introspect(JAM.policy.pFull) { " + v459 + " }")
    } else {
      var v1267 = JAM.call(eval, null, [v459])
    }
    introspect(JAM.policy.p13) {
      v75[v76] = v1267;
    }
    j$$2 = j$$2 + 1;
    v77 = j$$2 < arrayOfPatterns$$3.length;
  }
  return geneticCodeMatchExp$$1;
}
function getGeneticCodeMatchResult(arrayOfPatterns$$4) {
  var geneticCodeMatchResult$$1 = new Array(arrayOfPatterns$$4.length);
  var j$$3 = 0;
  var v83 = j$$3 < arrayOfPatterns$$4.length;
  for (;v83;) {
    var v79 = geneticCodeMatchResult$$1;
    var v80 = j$$3;
    introspect(JAM.policy.p26) {
      var v690 = arrayOfPatterns$$4[j$$3]
    }
    var v1268 = JAM.call(v690.match, v690, [/=[a-zA-Z\*]/], JAM.policy.p28).toString();
    introspect(JAM.policy.p13) {
      v79[v80] = v1268;
    }
    var v81 = geneticCodeMatchResult$$1;
    var v82 = j$$3;
    introspect(JAM.policy.p26) {
      var v463 = geneticCodeMatchResult$$1[j$$3]
    }
    var v1269 = JAM.call(v463.replace, v463, [/=/g, ""], JAM.policy.p27);
    introspect(JAM.policy.p13) {
      v81[v82] = v1269;
    }
    j$$3 = j$$3 + 1;
    v83 = j$$3 < arrayOfPatterns$$4.length;
  }
  return geneticCodeMatchResult$$1;
}
function getInfoFromTitleAndSequence(fastaSequenceTitle$$1, sequence$$3) {
  var stringToReturn$$2 = "Results for " + sequence$$3.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitle$$1.search, fastaSequenceTitle$$1, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn$$2 = stringToReturn$$2 + '"' + fastaSequenceTitle$$1 + '"';
  }
  stringToReturn$$2 = stringToReturn$$2 + ' starting "' + JAM.call(sequence$$3.substring, sequence$$3, [0, 10], JAM.policy.p23) + '"';
  return'<div class="info">' + stringToReturn$$2 + "</div>\n";
}
function getInfoFromTitleAndSequenceAndTopology(fastaSequenceTitle$$2, sequence$$4, topology) {
  var stringToReturn$$3 = "Results for " + topology + " " + sequence$$4.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitle$$2.search, fastaSequenceTitle$$2, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn$$3 = stringToReturn$$3 + '"' + fastaSequenceTitle$$2 + '"';
  }
  stringToReturn$$3 = stringToReturn$$3 + ' starting "' + JAM.call(sequence$$4.substring, sequence$$4, [0, 10], JAM.policy.p23) + '"';
  return'<div class="info">' + stringToReturn$$3 + "</div>\n";
}
function getPairwiseAlignTitle(fastaSequenceTitleOne$$1, sequenceOne$$1, fastaSequenceTitleTwo$$1, sequenceTwo$$1) {
  var stringToReturn$$4 = "Alignment results for " + sequenceOne$$1.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitleOne$$1.search, fastaSequenceTitleOne$$1, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn$$4 = stringToReturn$$4 + '"' + fastaSequenceTitleOne$$1 + '"';
  }
  stringToReturn$$4 = stringToReturn$$4 + ' starting "' + JAM.call(sequenceOne$$1.substring, sequenceOne$$1, [0, 10], JAM.policy.p23) + '"\n';
  stringToReturn$$4 = stringToReturn$$4 + "and " + sequenceTwo$$1.length + " residue sequence ";
  if (JAM.call(fastaSequenceTitleTwo$$1.search, fastaSequenceTitleTwo$$1, [/[^\s]/], JAM.policy.p28) != -1) {
    stringToReturn$$4 = stringToReturn$$4 + '"' + fastaSequenceTitleTwo$$1 + '"';
  }
  stringToReturn$$4 = stringToReturn$$4 + ' starting "' + JAM.call(sequenceTwo$$1.substring, sequenceTwo$$1, [0, 10], JAM.policy.p23) + '"';
  return'<div class="info">' + stringToReturn$$4 + "</div>\n";
}
function getRandomSequence(components, lengthOut) {
  var sequenceArray = new Array;
  var tempNum = 0;
  var tempChar = "";
  var j$$4 = 0;
  var v104 = j$$4 < lengthOut;
  for (;v104;) {
    tempNum = JAM.call(Math.floor, Math, [Math.random() * components.length], JAM.policy.p28);
    introspect(JAM.policy.p26) {
      tempChar = components[tempNum];
    }
    JAM.call(sequenceArray.push, sequenceArray, [tempChar], JAM.policy.p39);
    j$$4 = j$$4 + 1;
    v104 = j$$4 < lengthOut;
  }
  return JAM.call(sequenceArray.join, sequenceArray, [""], JAM.policy.p24);
}
function getSequenceFromFasta(sequenceRecord) {
  if (JAM.call(sequenceRecord.search, sequenceRecord, [/\>[^\f\n\r]+[\f\n\r]/], JAM.policy.p28) != -1) {
    sequenceRecord = JAM.call(sequenceRecord.replace, sequenceRecord, [/\>[^\f\n\r]+[\f\n\r]/, ""], JAM.policy.p27);
  }
  return sequenceRecord;
}
function getTitleFromFasta(sequenceRecord$$1) {
  var fastaTitle = "Untitled";
  if (JAM.call(sequenceRecord$$1.search, sequenceRecord$$1, [/\>[^\f\n\r]+[\f\n\r]/], JAM.policy.p28) != -1) {
    fastaTitle = JAM.call(sequenceRecord$$1.match, sequenceRecord$$1, [/\>[^\f\n\r]+[\f\n\r]/, ""], JAM.policy.p27).toString();
    fastaTitle = JAM.call(fastaTitle.replace, fastaTitle, [/\>|[\f\n\r]/g, ""], JAM.policy.p27);
    fastaTitle = JAM.call(fastaTitle.replace, fastaTitle, [/\s{2,}/g, " "], JAM.policy.p27);
    fastaTitle = JAM.call(fastaTitle.replace, fastaTitle, [/[\<\>]/gi, ""], JAM.policy.p27);
  }
  return fastaTitle;
}
function moreExpressionCheck(expressionToCheck) {
  var v1082 = JAM.call(expressionToCheck.search, expressionToCheck, [/\[[A-Za-z\|]*\[/], JAM.policy.p28) != -1;
  if (!v1082) {
    v1082 = JAM.call(expressionToCheck.search, expressionToCheck, [/\][A-Za-z\|]*\]/], JAM.policy.p28) != -1;
  }
  var v1056 = v1082;
  if (!v1056) {
    v1056 = JAM.call(expressionToCheck.search, expressionToCheck, [/\[\]/], JAM.policy.p28) != -1;
  }
  var v1028 = v1056;
  if (!v1028) {
    v1028 = JAM.call(expressionToCheck.search, expressionToCheck, [/\/[A-Za-z\|]*\]/], JAM.policy.p28) != -1;
  }
  var v997 = v1028;
  if (!v997) {
    v997 = JAM.call(expressionToCheck.search, expressionToCheck, [/\[[A-Za-z\|]*\//], JAM.policy.p28) != -1;
  }
  var v962 = v997;
  if (!v962) {
    v962 = JAM.call(expressionToCheck.search, expressionToCheck, [/\|\|/], JAM.policy.p28) != -1;
  }
  var v924 = v962;
  if (!v924) {
    v924 = JAM.call(expressionToCheck.search, expressionToCheck, [/\/\|/], JAM.policy.p28) != -1;
  }
  var v870 = v924;
  if (!v870) {
    v870 = JAM.call(expressionToCheck.search, expressionToCheck, [/\|\//], JAM.policy.p28) != -1;
  }
  var v801 = v870;
  if (!v801) {
    v801 = JAM.call(expressionToCheck.search, expressionToCheck, [/\[.\]/], JAM.policy.p28) != -1;
  }
  var v692 = v801;
  if (!v692) {
    v692 = JAM.call(expressionToCheck.search, expressionToCheck, [/\</], JAM.policy.p28) != -1;
  }
  var v491 = v692;
  if (!v491) {
    v491 = JAM.call(expressionToCheck.search, expressionToCheck, [/\>/], JAM.policy.p28) != -1;
  }
  if (v491) {
    return false;
  }
  return true;
}
function openForm() {
  var v109 = outputWindow.document;
  JAM.call(v109.write, v109, ['<form action="">\n'], JAM.policy.p24);
  return true;
}
function openPre() {
  var v110 = outputWindow.document;
  JAM.call(v110.write, v110, ["<pre>"], JAM.policy.p24);
  var v111 = outputWindow.document;
  JAM.call(v111.write, v111, ['<div class="pre">'], JAM.policy.p24);
  return;
}
function openTextArea() {
  var v112 = outputWindow.document;
  JAM.call(v112.write, v112, ['<br /><textarea rows="6" cols="61">\n'], JAM.policy.p24);
  return true;
}
function openWindow(title$$6) {
  _openWindow(title$$6, true);
  return;
}
function _openWindow(title$$7, isColor) {
  outputWindow = JAM.call(window.open, window, ["", "my_new_window", "toolbar=no, location=no, directories=no, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=no, width=800, height=400"], JAM.policy.p25);
  outputWindow.focus();
  var v113 = outputWindow.document;
  JAM.call(v113.write, v113, ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' + '<html lang="en">\n' + "<head>\n" + "<title>Sequence Manipulation Suite</title>\n" + '<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />\n'], JAM.policy.p39);
  if (isColor) {
    var v115 = outputWindow.document;
    JAM.call(v115.write, v115, ['<style type="text/css">\n' + "body.main {font-size: medium; font-family: arial, sans-serif; color: #000000; background-color: #FFFFFF}\n" + "div.pre {font-size: medium; color: #000000; font-family: courier, sans-serif; white-space: pre}\n" + "div.title {font-size: x-large; color: #000000; text-align: left; background-color: #FFFFFF}\n" + "div.info {font-weight: bold}\n" + "span.none, td.none {color: #000000; background-color: #FFFFFF}\n" + "span.one, td.one {color: #000000; background-color: #66FF00}\n" + 
    "span.two, td.two {color: #000000; background-color: #FFFF66}\n" + "span.three, td.three {color: #000000; background-color: #FFFFFF}\n" + "span.forward_primer, td.forward_primer {color: #000000; background-color: #FF66FF}\n" + "span.reverse_primer, td.reverse_primer {color: #000000; background-color: #FF9933}\n" + "span.current_sequence {color: #000000; background-color: #FFFFFF}\n" + "span.mutated_sequence {color: #990066; background-color: #FFFFFF}\n" + "td.many {color: #000000}\n" + "td.title {font-weight: bold; color: #000000; background-color: #FFFFFF}\n" + 
    "</style>\n"], JAM.policy.p39);
  } else {
    var v117 = outputWindow.document;
    JAM.call(v117.write, v117, ['<style type="text/css">\n' + "body.main {font-size: medium; font-family: arial, sans-serif; color: #000000; background-color: #FFFFFF; margin: 0 auto; padding: 0}\n" + "div.pre {font-size: medium; color: #000000; background-color: #FFFFFF; font-family: courier, sans-serif; white-space: pre}\n" + "div.title {display: none}\n" + "div.info {font-weight: bold}\n" + "span.none, td.none {color: #000000; background-color: #FFFFFF}\n" + "span.one, td.one {color: #000000; text-decoration: underline; background-color: #FFFFFF}\n" + 
    "span.two, td.two {color: #000000; font-style: italic; background-color: #FFFFFF}\n" + "span.three, td.three {color: #000000; background-color: #FFFFFF}\n" + "span.forward_primer, td.forward_primer {color: #000000; background-color: #FFFFFF}\n" + "span.reverse_primer, td.reverse_primer {color: #000000; background-color: #FFFFFF}\n" + "span.current_sequence {color: #000000; background-color: #FFFFFF}\n" + "span.mutated_sequence {color: #000000; text-decoration: underline; background-color: #FFFFFF}\n" + 
    "td.many {color: #000000; background-color: #FFFFFF}\n" + "td.title {font-weight: bold; color: #000000; background-color: #FFFFFF}\n" + "img {display: none}\n" + "</style>\n"], JAM.policy.p39);
  }
  var v119 = outputWindow.document;
  JAM.call(v119.write, v119, ["</head>\n" + '<body class="main">\n' + '<div class="title">' + title$$7 + " results</div>\n"], JAM.policy.p39);
  outputWindow.status = "Please Wait.";
  return true;
}
function openWindowAlign(title$$8) {
  _openWindowAlign(title$$8, true);
  return;
}
function _openWindowAlign(title$$9, isBackground) {
  outputWindow = JAM.call(window.open, window, ["", "my_new_window", "toolbar=no, location=no, directories=no, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=no, width=800, height=400"], JAM.policy.p25);
  outputWindow.focus();
  var v121 = outputWindow.document;
  JAM.call(v121.write, v121, ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' + '<html lang="en">\n' + "<head>\n" + "<title>Sequence Manipulation Suite</title>\n" + '<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />\n'], JAM.policy.p39);
  if (isBackground) {
    var v123 = outputWindow.document;
    JAM.call(v123.write, v123, ['<style type="text/css">\n' + "body.main {font-family: arial, sans-serif; color: #000000; background-color: #FFFFFF}\n" + "div.pre {font-size: medium; color: #000000; font-family: courier, sans-serif; white-space: pre}\n" + "div.title {font-size: x-large; color: #000000; text-align: left; background-color: #FFFFFF}\n" + "div.info {font-weight: bold}\n" + "span.ident {color: #FFFFFF; background-color: #000000}\n" + "span.sim {color: #FFFFFF; background-color: #666666}\n" + 
    "span.g, span.a, span.v, span.l, span.i {color: #000000; background-color: #C0C0C0}\n" + "span.f, span.y, span.w {color: #000000; background-color: #FF6600}\n" + "span.c, span.m {color: #000000; background-color: #FFFF00}\n" + "span.s, span.t {color: #000000; background-color: #66FF00}\n" + "span.k, span.r, span.h {color: #000000; background-color: #FF0000}\n" + "span.d, span.e {color: #000000; background-color: #0066FF}\n" + "span.n, span.q {color: #000000; background-color: #996633}\n" + "span.p {color: #000000; background-color: #FF99FF}\n" + 
    "</style>\n"], JAM.policy.p39);
  } else {
    var v125 = outputWindow.document;
    JAM.call(v125.write, v125, ['<style type="text/css">\n' + "body.main {font-family: arial, sans-serif; color: #000000; background-color: #FFFFFF}\n" + "div.pre {font-size: medium; color: #000000; font-family: courier, sans-serif; white-space: pre}\n" + "div.title {display: none}\n" + "div.info {font-weight: bold}\n" + "span.ident {color: #000000; font-weight: bold; text-decoration: underline; background-color: #FFFFFF}\n" + "span.sim {color: #000000; font-weight: bold; background-color: #FFFFFF}\n" + 
    "span.diff {color: #999999; background-color: #FFFFFF}\n" + "span.g, span.a, span.v, span.l, span.i {color: #CC33CC; background-color: #FFFFFF}\n" + "span.f, span.y, span.w {color: #FF6600; background-color: #FFFFFF}\n" + "span.c, span.m {color: #FFCC00; background-color: #FFFFFF}\n" + "span.s, span.t {color: #CCFF00; background-color: #FFFFFF}\n" + "span.k, span.r, span.h {color: #FF0000; background-color: #FFFFFF}\n" + "span.d, span.e {color: #0000FF; background-color: #FFFFFF}\n" + "span.n, span.q {color: #996633; background-color: #FFFFFF}\n" + 
    "span.p {color: #00FFCC; background-color: #FFFFFF}\n" + "img {display: none}\n" + "</style>\n"], JAM.policy.p39);
  }
  var v127 = outputWindow.document;
  JAM.call(v127.write, v127, ["</head>\n" + '<body class="main">\n' + '<div class="title">' + title$$9 + " results</div>\n"], JAM.policy.p39);
  outputWindow.status = "Please Wait.";
  return true;
}
function removeFormatting(sequence$$5) {
  return JAM.call(sequence$$5.replace, sequence$$5, [/[\d\s]/g, ""], JAM.policy.p27);
}
function removeNonDna(sequence$$6) {
  return JAM.call(sequence$$6.replace, sequence$$6, [/[^gatucryswkmbdhvnxGATUCRYSWKMBDHVNX]/g, ""], JAM.policy.p27);
}
function removeNonDnaStrict(sequence$$7) {
  return JAM.call(sequence$$7.replace, sequence$$7, [/[^gatucGATUC]/g, ""], JAM.policy.p27);
}
function removeNonProtein(sequence$$8) {
  return JAM.call(sequence$$8.replace, sequence$$8, [/[^ACDEFGHIKLMNPQRSTVWYZacdefghiklmnpqrstvwyz\*]/g, ""], JAM.policy.p27);
}
function removeNonProteinStrict(sequence$$9) {
  return JAM.call(sequence$$9.replace, sequence$$9, [/[^ACDEFGHIKLMNPQRSTVWYZacdefghiklmnpqrstvwyz\*]/g, ""], JAM.policy.p27);
}
function removeNonProteinAllowDegen(sequence$$10) {
  return JAM.call(sequence$$10.replace, sequence$$10, [/[^ABCDEFGHIKLMNPQRSTVWYXZabcdefghiklmnpqrstvwyxz\*]/g, ""], JAM.policy.p27);
}
function removeNonProteinAllowX(sequence$$11) {
  return JAM.call(sequence$$11.replace, sequence$$11, [/[^ACDEFGHIKLMNPQRSTVWYZXacdefghiklmnpqrstvwyzx\*]/g, ""], JAM.policy.p27);
}
function removeWhiteSpace(text$$9) {
  return JAM.call(text$$9.replace, text$$9, [/\s/g, ""], JAM.policy.p27);
}
function removeNonLetters(sequence$$12) {
  return JAM.call(sequence$$12.replace, sequence$$12, [/[^A-Z]/gi, ""], JAM.policy.p27);
}
function reverse(dnaSequence$$1) {
  var tempDnaArray = new Array;
  if (JAM.call(dnaSequence$$1.search, dnaSequence$$1, [/./], JAM.policy.p28) != -1) {
    tempDnaArray = JAM.call(dnaSequence$$1.match, dnaSequence$$1, [/./g], JAM.policy.p28);
    tempDnaArray = tempDnaArray.reverse();
    dnaSequence$$1 = JAM.call(tempDnaArray.join, tempDnaArray, [""], JAM.policy.p24);
  }
  return dnaSequence$$1;
}
function rightNum(theNumber, sequenceToAppend, lengthOfColumn, tabIn) {
  var j$$5 = 0;
  var tempString = "";
  theNumber = theNumber.toString();
  j$$5 = theNumber.length;
  var v130 = j$$5 < lengthOfColumn;
  for (;v130;) {
    tempString = tempString + " ";
    j$$5 = j$$5 + 1;
    v130 = j$$5 < lengthOfColumn;
  }
  theNumber = tempString + theNumber + " ";
  sequenceToAppend = sequenceToAppend + theNumber + tabIn;
  return sequenceToAppend;
}
function testScript() {
  function v1(str$$7, p1$$1, offset$$9, s$$3) {
    return p1$$1 + "X";
  }
  var testArray = new Array;
  var testString = "1234567890";
  JAM.call(testArray.push, testArray, [testString], JAM.policy.p39);
  if (testArray[0] != testString) {
    alert("Array object push method not supported. See browser compatibility page.");
    return false;
  }
  testString = "1\n2\n3";
  var re$$2 = /^2$/m;
  if (JAM.call(testString.search, testString, [re$$2], JAM.policy.p39) == -1) {
    alert("Regular expression 'm' flag not supported. See browser compatibility page.");
    return false;
  }
  var caughtException = false;
  try {
    if (JAM.isEval(eval)) {
      re$$2 = eval("introspect(JAM.policy.pFull) { " + "Exception handling not supported. Check browser compatibility page." + " }");
    } else {
      re$$2 = JAM.call(eval, null, ["Exception handling not supported. Check browser compatibility page."]);
    }
  } catch (e$$4) {
    caughtException = true;
  }
  if (!caughtException) {
    alert("Exception handling not supported. See browser compatibility page.");
  }
  testString = "123";
  testString = JAM.call(testString.replace, testString, [/(\d)/g, v1], JAM.policy.p27);
  if (testString != "1X2X3X") {
    alert("Nested function in String replace method not supported. See browser compatibility page.");
    return false;
  }
  var testNum = 2489.8237;
  if (JAM.call(testNum.toFixed, testNum, [3], JAM.policy.p22) != 2489.824) {
    alert("Number toFixed() method not supported. See browser compatibility page.");
    return false;
  }
  if (JAM.call(testNum.toPrecision, testNum, [5], JAM.policy.p22) != 2489.8) {
    alert("Number toPrecision() method not supported. See browser compatibility page.");
    return false;
  }
  return true;
}
function verifyDigits(theNumber$$1) {
  if (JAM.call(theNumber$$1.search, theNumber$$1, [/\d/], JAM.policy.p28) == -1) {
    alert("Please enter a number");
    return false;
  }
  return;
}
function verifyEmbl(emblFile) {
  var v812 = JAM.call(emblFile.search, emblFile, [/ID/], JAM.policy.p28) == -1;
  if (!v812) {
    v812 = JAM.call(emblFile.search, emblFile, [/AC/], JAM.policy.p28) == -1;
  }
  var v703 = v812;
  if (!v703) {
    v703 = JAM.call(emblFile.search, emblFile, [/DE/], JAM.policy.p28) == -1;
  }
  var v506 = v703;
  if (!v506) {
    v506 = JAM.call(emblFile.search, emblFile, [/SQ/], JAM.policy.p28) == -1;
  }
  if (v506) {
    alert("Please enter the contents of an EMBL file.");
    return false;
  }
  return true;
}
function verifyMaxDigits(theNumber$$2, maxInput$$2) {
  if (JAM.call(theNumber$$2.search, theNumber$$2, [/\d/], JAM.policy.p28) == -1) {
    alert("Please enter a number.");
    return false;
  }
  if (theNumber$$2 > maxInput$$2) {
    alert("Please enter a number less than or equal to " + maxInput$$2 + ".");
    return false;
  }
  return;
}
function verifyDna(dnaSequence$$2) {
  if (JAM.call(dnaSequence$$2.search, dnaSequence$$2, [/[^gatucryswkmbdhvnx\s]/i], JAM.policy.p28) != -1) {
    alert("The sequence contains non-DNA characters, which will be omitted.");
  }
  return true;
}
function verifyProtein(proteinSequence) {
  if (JAM.call(proteinSequence.search, proteinSequence, [/[^acdefghiklmnpqrstvwyz\*\s]/i], JAM.policy.p28) != -1) {
    alert("The sequence contains non-protein characters, which will be omitted.");
  }
  return true;
}
function verifyGenBank(genBankFile) {
  var v815 = JAM.call(genBankFile.search, genBankFile, [/LOCUS/], JAM.policy.p28) == -1;
  if (!v815) {
    v815 = JAM.call(genBankFile.search, genBankFile, [/DEFINITION/], JAM.policy.p28) == -1;
  }
  var v706 = v815;
  if (!v706) {
    v706 = JAM.call(genBankFile.search, genBankFile, [/ACCESSION/], JAM.policy.p28) == -1;
  }
  var v511 = v706;
  if (!v511) {
    v511 = JAM.call(genBankFile.search, genBankFile, [/ORIGIN/], JAM.policy.p28) == -1;
  }
  if (v511) {
    alert("Please enter the contents of a GenBank file.");
    return false;
  }
  return true;
}
function verifyGenBankFeat(genBankFile$$1) {
  var v818 = JAM.call(genBankFile$$1.search, genBankFile$$1, [/LOCUS/], JAM.policy.p28) == -1;
  if (!v818) {
    v818 = JAM.call(genBankFile$$1.search, genBankFile$$1, [/DEFINITION/], JAM.policy.p28) == -1;
  }
  var v709 = v818;
  if (!v709) {
    v709 = JAM.call(genBankFile$$1.search, genBankFile$$1, [/ACCESSION/], JAM.policy.p28) == -1;
  }
  var v512 = v709;
  if (!v512) {
    v512 = JAM.call(genBankFile$$1.search, genBankFile$$1, [/ORIGIN/], JAM.policy.p28) == -1;
  }
  if (v512) {
    alert("Please enter the contents of a GenBank file.");
    return false;
  }
  if (JAM.call(genBankFile$$1.search, genBankFile$$1, [/FEATURES {13}/], JAM.policy.p28) == -1) {
    alert("The file has no defined features.");
    return false;
  }
  return true;
}
function verifyEmblFeat(emblFile$$1) {
  var v821 = JAM.call(emblFile$$1.search, emblFile$$1, [/ID/], JAM.policy.p28) == -1;
  if (!v821) {
    v821 = JAM.call(emblFile$$1.search, emblFile$$1, [/AC/], JAM.policy.p28) == -1;
  }
  var v712 = v821;
  if (!v712) {
    v712 = JAM.call(emblFile$$1.search, emblFile$$1, [/DE/], JAM.policy.p28) == -1;
  }
  var v514 = v712;
  if (!v514) {
    v514 = JAM.call(emblFile$$1.search, emblFile$$1, [/SQ/], JAM.policy.p28) == -1;
  }
  if (v514) {
    alert("Please enter the contents of an EMBL file.");
    return false;
  }
  if (JAM.call(emblFile$$1.search, emblFile$$1, [/^FT/m], JAM.policy.p28) == -1) {
    alert("The file has no defined features.");
    return false;
  }
  return true;
}
function writeGroupNum(text$$10, tabIn$$1, groupSize, basePerLine, startBase, stopBase) {
  var i$$5 = parseInt(startBase);
  var k = 0;
  var lineOfText = "";
  var sepChar = " ";
  groupSize = parseInt(groupSize);
  basePerLine = parseInt(basePerLine);
  var v158 = i$$5 < stopBase;
  for (;v158;) {
    lineOfText = rightNum(i$$5 + 1, lineOfText, 8, tabIn$$1);
    var j$$6 = 1;
    var v155 = j$$6 <= basePerLine / groupSize;
    for (;v155;) {
      var v154 = k < groupSize;
      for (;v154;) {
        lineOfText = lineOfText + JAM.call(text$$10.charAt, text$$10, [k + i$$5], JAM.policy.p39);
        k = k + 1;
        v154 = k < groupSize;
      }
      i$$5 = i$$5 + groupSize;
      k = 0;
      lineOfText = lineOfText + sepChar;
      j$$6 = j$$6 + 1;
      v155 = j$$6 <= basePerLine / groupSize;
    }
    var v156 = outputWindow.document;
    JAM.call(v156.write, v156, [lineOfText + "\n"], JAM.policy.p39);
    lineOfText = "";
    v158 = i$$5 < stopBase;
  }
  return true;
}
function writeGroupNumDna(text$$11, tabIn$$2, groupSize$$1, basePerLine$$1, startBase$$1, stopBase$$1, strands, numberPosition) {
  writeGroupNumDnaSetStart(text$$11, tabIn$$2, groupSize$$1, basePerLine$$1, startBase$$1, stopBase$$1, strands, numberPosition, 0);
  return true;
}
function writeGroupNumDnaSetStart(text$$12, tabIn$$3, groupSize$$2, basePerLine$$2, startBase$$2, stopBase$$2, strands$$1, numberPosition$$1, numberingAdjustment) {
  function adjustNumbering(original, adjustment) {
    var adjusted = original + adjustment;
    var v519 = adjustment < 0;
    if (v519) {
      v519 = adjusted >= 0;
    }
    if (v519) {
      adjusted = adjusted + 1;
    }
    return adjusted;
  }
  var i$$6 = parseInt(startBase$$2);
  var k$$1 = 0;
  var lineOfText$$1 = "";
  var lineNum = "";
  var sepChar$$1 = " ";
  var aboveNum = "";
  groupSize$$2 = parseInt(groupSize$$2);
  basePerLine$$2 = parseInt(basePerLine$$2);
  numberingAdjustment = parseInt(numberingAdjustment);
  var v192 = i$$6 < stopBase$$2;
  for (;v192;) {
    lineNum = i$$6 + 1;
    var j$$7 = 1;
    var v168 = j$$7 <= basePerLine$$2 / groupSize$$2;
    for (;v168;) {
      var v163 = k$$1 < groupSize$$2;
      for (;v163;) {
        if (i$$6 + k$$1 >= stopBase$$2) {
          break;
        }
        lineOfText$$1 = lineOfText$$1 + JAM.call(text$$12.charAt, text$$12, [k$$1 + i$$6], JAM.policy.p39);
        k$$1 = k$$1 + 1;
        v163 = k$$1 < groupSize$$2;
      }
      lineOfText$$1 = lineOfText$$1 + sepChar$$1;
      i$$6 = i$$6 + k$$1;
      if (numberPosition$$1 == "above") {
        aboveNum = aboveNum + rightNum(adjustNumbering(i$$6, numberingAdjustment), "", groupSize$$2, tabIn$$3);
      }
      if (i$$6 >= stopBase$$2) {
        break;
      }
      k$$1 = 0;
      j$$7 = j$$7 + 1;
      v168 = j$$7 <= basePerLine$$2 / groupSize$$2;
    }
    if (numberPosition$$1 == "left") {
      var v169 = outputWindow.document;
      JAM.call(v169.write, v169, [rightNum(adjustNumbering(lineNum, numberingAdjustment), "", 8, tabIn$$3) + lineOfText$$1 + "\n"], JAM.policy.p39);
      if (strands$$1 == "two") {
        var v171 = outputWindow.document;
        JAM.call(v171.write, v171, [rightNum(adjustNumbering(lineNum, numberingAdjustment), "", 8, tabIn$$3) + complement(lineOfText$$1) + "\n"], JAM.policy.p39);
        var v173 = outputWindow.document;
        JAM.call(v173.write, v173, ["\n"], JAM.policy.p24);
      }
    } else {
      if (numberPosition$$1 == "right") {
        var v175 = outputWindow.document;
        JAM.call(v175.write, v175, [lineOfText$$1 + adjustNumbering(i$$6, numberingAdjustment) + "\n"], JAM.policy.p39);
        if (strands$$1 == "two") {
          var v177 = outputWindow.document;
          JAM.call(v177.write, v177, [complement(lineOfText$$1) + adjustNumbering(i$$6, numberingAdjustment) + "\n"], JAM.policy.p39);
          var v179 = outputWindow.document;
          JAM.call(v179.write, v179, ["\n"], JAM.policy.p24);
        }
      } else {
        if (numberPosition$$1 == "above") {
          var v181 = outputWindow.document;
          JAM.call(v181.write, v181, [aboveNum + "\n"], JAM.policy.p39);
          var v183 = outputWindow.document;
          JAM.call(v183.write, v183, [lineOfText$$1 + "\n"], JAM.policy.p39);
          if (strands$$1 == "two") {
            var v185 = outputWindow.document;
            JAM.call(v185.write, v185, [complement(lineOfText$$1) + "\n"], JAM.policy.p39);
            var v187 = outputWindow.document;
            JAM.call(v187.write, v187, ["\n"], JAM.policy.p24);
          }
        }
      }
    }
    aboveNum = "";
    lineOfText$$1 = "";
    v192 = i$$6 < stopBase$$2;
  }
  return true;
}
function writeGroupNumProtein(text$$13, tabIn$$4, groupSize$$3, basePerLine$$3, startBase$$3, stopBase$$3, numberPosition$$2) {
  var i$$7 = parseInt(startBase$$3);
  var k$$2 = 0;
  var lineOfText$$2 = "";
  var lineNum$$1 = "";
  var sepChar$$2 = " ";
  var aboveNum$$1 = "";
  groupSize$$3 = parseInt(groupSize$$3);
  basePerLine$$3 = parseInt(basePerLine$$3);
  var v213 = i$$7 < stopBase$$3;
  for (;v213;) {
    lineNum$$1 = i$$7 + 1;
    var j$$8 = 1;
    var v201 = j$$8 <= basePerLine$$3 / groupSize$$3;
    for (;v201;) {
      var v196 = k$$2 < groupSize$$3;
      for (;v196;) {
        if (i$$7 + k$$2 >= stopBase$$3) {
          break;
        }
        lineOfText$$2 = lineOfText$$2 + JAM.call(text$$13.charAt, text$$13, [k$$2 + i$$7], JAM.policy.p39);
        k$$2 = k$$2 + 1;
        v196 = k$$2 < groupSize$$3;
      }
      lineOfText$$2 = lineOfText$$2 + sepChar$$2;
      i$$7 = i$$7 + k$$2;
      if (numberPosition$$2 == "above") {
        aboveNum$$1 = aboveNum$$1 + rightNum(i$$7, "", groupSize$$3, tabIn$$4);
      }
      if (i$$7 >= stopBase$$3) {
        break;
      }
      k$$2 = 0;
      j$$8 = j$$8 + 1;
      v201 = j$$8 <= basePerLine$$3 / groupSize$$3;
    }
    if (numberPosition$$2 == "left") {
      var v202 = outputWindow.document;
      JAM.call(v202.write, v202, [rightNum(lineNum$$1, "", 8, tabIn$$4) + lineOfText$$2 + "\n"], JAM.policy.p39);
    } else {
      if (numberPosition$$2 == "right") {
        var v204 = outputWindow.document;
        JAM.call(v204.write, v204, [lineOfText$$2 + i$$7 + "\n"], JAM.policy.p39);
      } else {
        if (numberPosition$$2 == "above") {
          var v206 = outputWindow.document;
          JAM.call(v206.write, v206, [aboveNum$$1 + "\n"], JAM.policy.p39);
          var v208 = outputWindow.document;
          JAM.call(v208.write, v208, [lineOfText$$2 + "\n"], JAM.policy.p39);
        }
      }
    }
    aboveNum$$1 = "";
    lineOfText$$2 = "";
    v213 = i$$7 < stopBase$$3;
  }
  return true;
}
function writeMutatedSequence(sequence$$13, components$$1, numMut, firstIndexToMutate, lastIndexToMutate) {
  var currentChar = "";
  var randNum = 0;
  var maxNum = 0;
  var needNewChar = "";
  var componentsIndex = 0;
  numMut = parseInt(numMut);
  firstIndexToMutate = parseInt(firstIndexToMutate);
  lastIndexToMutate = parseInt(lastIndexToMutate);
  var v723 = sequence$$13.length <= firstIndexToMutate;
  if (!v723) {
    v723 = lastIndexToMutate < 0;
  }
  var v536 = v723;
  if (!v536) {
    v536 = lastIndexToMutate <= firstIndexToMutate;
  }
  if (v536) {
    numMut = 0;
  }
  var i$$8 = 0;
  var v222 = i$$8 < numMut;
  for (;v222;) {
    maxNum = sequence$$13.length;
    randNum = JAM.call(Math.floor, Math, [Math.random() * maxNum], JAM.policy.p28);
    var v538 = randNum < firstIndexToMutate;
    if (!v538) {
      v538 = randNum > lastIndexToMutate;
    }
    if (v538) {
      numMut = numMut + 1;
      i$$8 = i$$8 + 1;
      v222 = i$$8 < numMut;
      continue;
    }
    currentChar = JAM.call(sequence$$13.charAt, sequence$$13, [randNum], JAM.policy.p28);
    needNewChar = true;
    for (;needNewChar;) {
      componentsIndex = JAM.call(Math.round, Math, [Math.random() * components$$1.length], JAM.policy.p28);
      if (componentsIndex == components$$1.length) {
        componentsIndex = 0;
      }
      introspect(JAM.policy.p26) {
        var v542 = components$$1[componentsIndex]
      }
      if (v542 != currentChar) {
        needNewChar = false;
      }
    }
    var v543 = JAM.call(sequence$$13.substring, sequence$$13, [0, randNum], JAM.policy.p23);
    introspect(JAM.policy.p26) {
      var v544 = components$$1[componentsIndex]
    }
    sequence$$13 = v543 + v544 + JAM.call(sequence$$13.substring, sequence$$13, [randNum + 1, sequence$$13.length], JAM.policy.p40);
    i$$8 = i$$8 + 1;
    v222 = i$$8 < numMut;
  }
  var v223 = outputWindow.document;
  JAM.call(v223.write, v223, [addReturns(sequence$$13)], JAM.policy.p39);
  return true;
}
function writeRandomSequence(components$$2, lengthOut$$1) {
  var sequence$$14 = "";
  var tempNum$$1 = 0;
  var tempChar$$1 = "";
  var j$$9 = 0;
  var v229 = j$$9 < lengthOut$$1;
  for (;v229;) {
    tempNum$$1 = JAM.call(Math.floor, Math, [Math.random() * components$$2.length], JAM.policy.p28);
    introspect(JAM.policy.p26) {
      tempChar$$1 = components$$2[tempNum$$1];
    }
    sequence$$14 = sequence$$14 + tempChar$$1;
    if (sequence$$14.length == 60) {
      var v226 = outputWindow.document;
      JAM.call(v226.write, v226, [sequence$$14 + "\n"], JAM.policy.p39);
      sequence$$14 = "";
    }
    j$$9 = j$$9 + 1;
    v229 = j$$9 < lengthOut$$1;
  }
  var v230 = outputWindow.document;
  JAM.call(v230.write, v230, [sequence$$14 + "\n"], JAM.policy.p39);
  return true;
}
function writeRestrictionSites(sequence$$15, arrayOfItems, dnaConformation) {
  var resultArray = new Array;
  var lookAhead = 50;
  var lowerLimit = 0;
  var upperLimit = sequence$$15.length;
  var shiftValue = 0;
  var cutDistance;
  var matchExp;
  var matchPosition;
  var tempString$$1;
  var backGroundClass;
  var matchArray$$1;
  var timesFound = 0;
  if (dnaConformation == "circular") {
    shiftValue = JAM.call(sequence$$15.substring, sequence$$15, [0, lookAhead], JAM.policy.p23).length;
    sequence$$15 = JAM.call(sequence$$15.substring, sequence$$15, [sequence$$15.length - lookAhead, sequence$$15.length], JAM.policy.p40) + sequence$$15 + JAM.call(sequence$$15.substring, sequence$$15, [0, lookAhead], JAM.policy.p23);
    lowerLimit = 0 + shiftValue;
    upperLimit = upperLimit + shiftValue;
  }
  var v236 = outputWindow.document;
  JAM.call(v236.write, v236, ['<table border="1" width="100%" cellspacing="0" cellpadding="2"><tbody>\n'], JAM.policy.p24);
  var v237 = outputWindow.document;
  JAM.call(v237.write, v237, ['<tr><td class="title" width="200px">' + "Site:" + '</td><td class="title">' + "Positions:" + "</td></tr>\n"], JAM.policy.p39);
  var i$$9 = 0;
  var v254 = i$$9 < arrayOfItems.length;
  for (;v254;) {
    tempString$$1 = "none";
    backGroundClass = "many";
    introspect(JAM.policy.p26) {
      var v553 = arrayOfItems[i$$9]
    }
    matchExp = JAM.call(v553.match, v553, [/\/.+\//], JAM.policy.p28) + "gi";
    matchPosition = 0;
    if (JAM.isEval(eval)) {
      matchExp = eval("introspect(JAM.policy.pFull) { " + matchExp + " }");
    } else {
      matchExp = JAM.call(eval, null, [matchExp]);
    }
    introspect(JAM.policy.p26) {
      var v830 = arrayOfItems[i$$9]
    }
    var v554 = JAM.call(v830.match, v830, [/\)\D*\d+/], JAM.policy.p28).toString();
    cutDistance = parseFloat(JAM.call(v554.replace, v554, [/\)\D*/, ""], JAM.policy.p27));
    var v246 = matchArray$$1 = JAM.call(matchExp.exec, matchExp, [sequence$$15], JAM.policy.p39);
    for (;v246;) {
      matchPosition = matchExp.lastIndex - cutDistance;
      var v555 = matchPosition >= lowerLimit;
      if (v555) {
        v555 = matchPosition < upperLimit;
      }
      if (v555) {
        timesFound = timesFound + 1;
        tempString$$1 = tempString$$1 + ", " + (matchPosition - shiftValue + 1);
      }
      matchExp.lastIndex = matchExp.lastIndex - RegExp.lastMatch.length + 1;
      v246 = matchArray$$1 = JAM.call(matchExp.exec, matchExp, [sequence$$15], JAM.policy.p39);
    }
    if (JAM.call(tempString$$1.search, tempString$$1, [/\d/], JAM.policy.p28) != -1) {
      tempString$$1 = JAM.call(tempString$$1.replace, tempString$$1, [/none,\s*/, ""], JAM.policy.p27);
    }
    if (timesFound == 0) {
      backGroundClass = "none";
    } else {
      if (timesFound == 1) {
        backGroundClass = "one";
      } else {
        if (timesFound == 2) {
          backGroundClass = "two";
        } else {
          if (timesFound == 3) {
            backGroundClass = "three";
          } else {
            backGroundClass = "many";
          }
        }
      }
    }
    var v252 = outputWindow.document;
    var v969 = '<tr><td class="' + backGroundClass + '">';
    introspect(JAM.policy.p26) {
      var v1063 = arrayOfItems[i$$9]
    }
    var v1005 = JAM.call(v1063.match, v1063, [/\([^\(]+\)/], JAM.policy.p28).toString();
    JAM.call(v252.write, v252, [v969 + JAM.call(v1005.replace, v1005, [/\(|\)/g, ""], JAM.policy.p27) + '</td><td class="' + backGroundClass + '">' + tempString$$1 + "</td></tr>\n"], JAM.policy.p39);
    timesFound = 0;
    i$$9 = i$$9 + 1;
    v254 = i$$9 < arrayOfItems.length;
  }
  var v255 = outputWindow.document;
  JAM.call(v255.write, v255, ["</tbody></table>\n"], JAM.policy.p24);
  return true;
}
function writeSequenceStats(sequence$$16, arrayOfItems$$1) {
  var originalLength = sequence$$16.length;
  var v256 = outputWindow.document;
  JAM.call(v256.write, v256, ['<table border="1" width="100%" cellspacing="0" cellpadding="2"><tbody>\n'], JAM.policy.p24);
  var v257 = outputWindow.document;
  JAM.call(v257.write, v257, ['<tr><td class="title">' + "Pattern:" + '</td><td class="title">' + "Times found:" + '</td><td class="title">' + "Percentage:" + "</td></tr>\n"], JAM.policy.p39);
  var i$$10 = 0;
  var v267 = i$$10 < arrayOfItems$$1.length;
  for (;v267;) {
    var tempNumber = 0;
    introspect(JAM.policy.p26) {
      var v564 = arrayOfItems$$1[i$$10]
    }
    var matchExp$$1 = JAM.call(v564.match, v564, [/\/[^\/]+\//], JAM.policy.p28) + "gi";
    if (JAM.isEval(eval)) {
      matchExp$$1 = eval("introspect(JAM.policy.pFull) { " + matchExp$$1 + " }");
    } else {
      matchExp$$1 = JAM.call(eval, null, [matchExp$$1]);
    }
    if (JAM.call(sequence$$16.search, sequence$$16, [matchExp$$1], JAM.policy.p39) != -1) {
      tempNumber = JAM.call(sequence$$16.match, sequence$$16, [matchExp$$1], JAM.policy.p39).length;
    }
    var percentage = 0;
    var v733 = originalLength + 1;
    introspect(JAM.policy.p26) {
      var v891 = arrayOfItems$$1[i$$10]
    }
    if (v733 - parseFloat(JAM.call(v891.match, v891, [/\d+/], JAM.policy.p28)) > 0) {
      var v262 = 100 * tempNumber;
      var v567 = originalLength + 1;
      introspect(JAM.policy.p26) {
        var v834 = arrayOfItems$$1[i$$10]
      }
      percentage = v262 / (v567 - parseFloat(JAM.call(v834.match, v834, [/\d+/], JAM.policy.p28)));
    }
    var v265 = outputWindow.document;
    introspect(JAM.policy.p26) {
      var v1064 = arrayOfItems$$1[i$$10]
    }
    var v1006 = JAM.call(v1064.match, v1064, [/\([^\(]+\)\b/], JAM.policy.p28).toString();
    JAM.call(v265.write, v265, ["<tr><td>" + JAM.call(v1006.replace, v1006, [/\(|\)/g, ""], JAM.policy.p27) + "</td><td>" + tempNumber + "</td><td>" + JAM.call(percentage.toFixed, percentage, [2], JAM.policy.p22) + "</td></tr>\n"], JAM.policy.p39);
    i$$10 = i$$10 + 1;
    v267 = i$$10 < arrayOfItems$$1.length;
  }
  var v268 = outputWindow.document;
  JAM.call(v268.write, v268, ["</tbody></table>\n"], JAM.policy.p24);
  return true;
}
function writeShuffledSequence(sequence$$17) {
  var tempSeq = "";
  var tempChar$$2 = "";
  var tempString1 = "";
  var tempString2 = "";
  var randNum$$1 = 0;
  var maxNum$$1 = 0;
  var v275 = sequence$$17.length > 0;
  for (;v275;) {
    maxNum$$1 = sequence$$17.length;
    randNum$$1 = JAM.call(Math.floor, Math, [Math.random() * maxNum$$1], JAM.policy.p28);
    tempChar$$2 = JAM.call(sequence$$17.charAt, sequence$$17, [randNum$$1], JAM.policy.p28);
    tempSeq = tempSeq + tempChar$$2;
    tempString1 = JAM.call(sequence$$17.substring, sequence$$17, [0, randNum$$1], JAM.policy.p23);
    tempString2 = JAM.call(sequence$$17.substring, sequence$$17, [randNum$$1 + 1, sequence$$17.length], JAM.policy.p27);
    sequence$$17 = tempString1 + tempString2;
    if (tempSeq.length == 60) {
      var v272 = outputWindow.document;
      JAM.call(v272.write, v272, [tempSeq + "\n"], JAM.policy.p39);
      tempSeq = "";
    }
    v275 = sequence$$17.length > 0;
  }
  var v276 = outputWindow.document;
  JAM.call(v276.write, v276, [tempSeq + "\n"], JAM.policy.p39);
  return true;
}
function getGeneticCodeString(type$$25) {
  var v575 = type$$25.toLowerCase() == "standard";
  if (!v575) {
    v575 = type$$25.toLowerCase() == "transl_table=1";
  }
  if (v575) {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]|[tu]ga|[tu][agr]a/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=2") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][tcuy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu][agr]/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + "/[tu]g[agr]/=W," + 
    "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]|ag[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=3") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][tcuy]/=I," + "/aa[agr]/=K," + "/[tu][tu][agr]/=L," + "/a[tu][agr]/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]|c[tu][acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + "/[tu]g[agr]/=W," + 
    "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=4") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]g[agr]/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=5") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][tcuy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu][agr]/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]g[agr]/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=6") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]|[tu]a[agr]|[tcuy]a[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]ga/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=9") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aag/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[atcuwmhy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]g[agr]/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=10") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[atcuwmhy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=11") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]|[tu]ga|[tu][agr]a/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=12") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][atcuwmhy]|[tu][tu][agr]|[ctuy][tu]a/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]|c[tu]g/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]|[tu]ga|[tu][agr]a/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=13") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]|ag[agr]|[agr]g[agr]/=G," + "/ca[tcuy]/=H," + "/a[tu][tcuy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu][agr]/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]g[agr]/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=14") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aag/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[atcuwmhy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]g[agr]/=W," + "/[tu]a[atcuwmhy]/=Y," + "/[tu]ag/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=15") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]|[tu]ag|[tcuy]ag/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu][agr]a/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=16") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]|[tu]ag|[tu][atuw]g/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu][agr]a/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=21") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][tcuy]/=I," + "/aag/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]/=L," + "/a[tu][agr]/=M," + "/aa[atcuwmhy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[acgturyswkmbdhvn]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]g[agr]/=W," + "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=22") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[tu][tu][agr]|[ctuy][tu][agr]|[tu]ag|[tu][atuw]g/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[cgtyskb]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + 
    "/[tu]gg/=W," + "/[tu]a[ctuy]/=Y," + "/[tu][agcrsmv]a/=*";
  }
  if (type$$25.toLowerCase() == "transl_table=23") {
    return "/gc[acgturyswkmbdhvn]/=A," + "/[tu]g[ctuy]/=C," + "/ga[tcuy]/=D," + "/ga[agr]/=E," + "/[tu][tu][tcuy]/=F," + "/gg[acgturyswkmbdhvn]/=G," + "/ca[tcuy]/=H," + "/a[tu][atcuwmhy]/=I," + "/aa[agr]/=K," + "/c[tu][acgturyswkmbdhvn]|[ctuy][tu]g/=L," + "/a[tu]g/=M," + "/aa[tucy]/=N," + "/cc[acgturyswkmbdhvn]/=P," + "/ca[agr]/=Q," + "/cg[acgturyswkmbdhvn]|ag[agr]|[cam]g[agr]/=R," + "/[tu]c[acgturyswkmbdhvn]|ag[ct]/=S," + "/ac[acgturyswkmbdhvn]/=T," + "/g[tu][acgturyswkmbdhvn]/=V," + "/[tu]gg/=W," + 
    "/[tu]a[ctuy]/=Y," + "/[tu]a[agr]|[tu]ga|[tu][agtrwkd]a/=*";
  }
  return true;
}
function codonUsage(theDocument) {
  var newDna = "";
  var maxInput$$3 = 5E5;
  var codonTable$$1;
  if (testScript() == false) {
    return false;
  }
  var v610 = checkFormElement(theDocument.forms[0].elements[0]) == false;
  if (!v610) {
    v610 = checkTextLength(theDocument.forms[0].elements[0].value, maxInput$$3) == false;
  }
  if (v610) {
    return false;
  }
  var v761 = theDocument.forms[0].elements[4].options;
  var v762 = theDocument.forms[0].elements[4].selectedIndex;
  introspect(JAM.policy.p26) {
    var v611 = v761[v762]
  }
  var geneticCode = getGeneticCodeString(v611.value);
  geneticCode = JAM.call(geneticCode.split, geneticCode, [/,/], JAM.policy.p28);
  if (checkGeneticCode(geneticCode) == false) {
    return false;
  }
  codonTable$$1 = makeCodonTable(geneticCode);
  if (codonTable$$1 == false) {
    return false;
  }
  resetCounts(codonTable$$1);
  openWindow("Codon Usage");
  openPre();
  var arrayOfFasta$$1 = getArrayOfFasta(theDocument.forms[0].elements[0].value);
  var i$$11 = 0;
  var v323 = i$$11 < arrayOfFasta$$1.length;
  for (;v323;) {
    introspect(JAM.policy.p26) {
      var v318 = arrayOfFasta$$1[i$$11]
    }
    newDna = getSequenceFromFasta(v318);
    introspect(JAM.policy.p26) {
      var v319 = arrayOfFasta$$1[i$$11]
    }
    title = getTitleFromFasta(v319);
    newDna = removeNonDna(newDna);
    var v320 = outputWindow.document;
    JAM.call(v320.write, v320, [getInfoFromTitleAndSequence(title, newDna)], JAM.policy.p39);
    addCodons(codonTable$$1, newDna);
    codonTable$$1.determineValues();
    writeCodonTable(codonTable$$1);
    resetCounts(codonTable$$1);
    var v322 = outputWindow.document;
    JAM.call(v322.write, v322, ["\n\n"], JAM.policy.p24);
    i$$11 = i$$11 + 1;
    v323 = i$$11 < arrayOfFasta$$1.length;
  }
  closePre();
  closeWindow();
  return true;
}
function writeCodonTable(codonTable$$2) {
  var v324 = outputWindow.document;
  JAM.call(v324.write, v324, [rightNum("AmAcid", "", 6, "") + rightNum("Codon", "", 7, "") + rightNum("Number", "", 10, "") + rightNum("/1000", "", 12, "") + rightNum("Fraction   ..", "", 17, "") + "\n\n"], JAM.policy.p39);
  var i$$12 = 0;
  var v331 = i$$12 < codonTable$$2.aminoAcids.length;
  for (;v331;) {
    var v618 = codonTable$$2.aminoAcids;
    introspect(JAM.policy.p26) {
      var v326 = v618[i$$12]
    }
    arrayOfCodons = v326.codons;
    var j$$10 = 0;
    var v329 = j$$10 < arrayOfCodons.length;
    for (;v329;) {
      var v327 = outputWindow.document;
      var v1054 = codonTable$$2.aminoAcids;
      introspect(JAM.policy.p26) {
        var v1025 = v1054[i$$12]
      }
      var v957 = rightNum(v1025.name, "", 3, "");
      introspect(JAM.policy.p26) {
        var v1055 = arrayOfCodons[j$$10]
      }
      var v917 = v957 + rightNum(v1055.sequence.toUpperCase(), "", 8, "");
      introspect(JAM.policy.p26) {
        var v1027 = arrayOfCodons[j$$10]
      }
      var v995 = v1027.number;
      var v860 = v917 + rightNum(JAM.call(v995.toFixed, v995, [2], JAM.policy.p22), "", 12, "");
      introspect(JAM.policy.p26) {
        var v996 = arrayOfCodons[j$$10]
      }
      var v960 = v996.perThou;
      var v767 = v860 + rightNum(JAM.call(v960.toFixed, v960, [2], JAM.policy.p22), "", 12, "");
      introspect(JAM.policy.p26) {
        var v961 = arrayOfCodons[j$$10]
      }
      var v920 = v961.fraction;
      JAM.call(v327.write, v327, [v767 + rightNum(JAM.call(v920.toFixed, v920, [2], JAM.policy.p22), "", 12, "") + "\n"], JAM.policy.p39);
      j$$10 = j$$10 + 1;
      v329 = j$$10 < arrayOfCodons.length;
    }
    var v330 = outputWindow.document;
    JAM.call(v330.write, v330, ["\n"], JAM.policy.p24);
    i$$12 = i$$12 + 1;
    v331 = i$$12 < codonTable$$2.aminoAcids.length;
  }
  return;
}
function addCodons(codonTable$$3, dnaSequence$$3) {
  function v2(str$$8, p1$$2, offset$$10, s$$4) {
    return " " + p1$$2 + " ";
  }
  dnaSequence$$3 = JAM.call(dnaSequence$$3.replace, dnaSequence$$3, [/u/gi, "t"], JAM.policy.p27);
  dnaSequence$$3 = JAM.call(dnaSequence$$3.replace, dnaSequence$$3, [/(...)/g, v2], JAM.policy.p27);
  var matchExp$$2;
  var arrayOfCodons$$1;
  var i$$13 = 0;
  var v338 = i$$13 < codonTable$$3.aminoAcids.length;
  for (;v338;) {
    var v624 = codonTable$$3.aminoAcids;
    introspect(JAM.policy.p26) {
      var v333 = v624[i$$13]
    }
    arrayOfCodons$$1 = v333.codons;
    var j$$11 = 0;
    var v337 = j$$11 < arrayOfCodons$$1.length;
    for (;v337;) {
      introspect(JAM.policy.p26) {
        var v626 = arrayOfCodons$$1[j$$11]
      }
      matchExp$$2 = new RegExp(v626.sequence, "gi");
      if (JAM.call(dnaSequence$$3.search, dnaSequence$$3, [matchExp$$2], JAM.policy.p39) != -1) {
        introspect(JAM.policy.p26) {
          var v335 = arrayOfCodons$$1[j$$11]
        }
        introspect(JAM.policy.p26) {
          var v771 = arrayOfCodons$$1[j$$11]
        }
        v335.number = v771.number + JAM.call(dnaSequence$$3.match, dnaSequence$$3, [matchExp$$2], JAM.policy.p39).length;
      }
      j$$11 = j$$11 + 1;
      v337 = j$$11 < arrayOfCodons$$1.length;
    }
    i$$13 = i$$13 + 1;
    v338 = i$$13 < codonTable$$3.aminoAcids.length;
  }
  return;
}
function resetCounts(codonTable$$4) {
  var i$$14 = 0;
  var v342 = i$$14 < codonTable$$4.aminoAcids.length;
  for (;v342;) {
    var v633 = codonTable$$4.aminoAcids;
    introspect(JAM.policy.p26) {
      var v339 = v633[i$$14]
    }
    arrayOfCodons = v339.codons;
    var j$$12 = 0;
    var v341 = j$$12 < arrayOfCodons.length;
    for (;v341;) {
      introspect(JAM.policy.p26) {
        var v340 = arrayOfCodons[j$$12]
      }
      v340.resetValues();
      j$$12 = j$$12 + 1;
      v341 = j$$12 < arrayOfCodons.length;
    }
    i$$14 = i$$14 + 1;
    v342 = i$$14 < codonTable$$4.aminoAcids.length;
  }
  return;
}
function makeCodonTable(geneticCode$$1) {
  function v3(str$$9, p1$$3, offset$$11, s$$5) {
    return " " + p1$$3 + " ";
  }
  var codonSequence = "gggggaggtggcgaggaagatgacgtggtagttgtcgcggcagctgccaggagaagtagcaagaaaaataacatgataattatcacgacaactacctggtgatgttgctagtaatattacttgttatttttctcgtcatcttcccggcgacgtcgccagcaacatcacctgctacttctcccgccacctccc";
  var proteinSequence$$1;
  var codonTable$$5 = new CodonTable;
  var geneticCodeMatchExp$$2 = getGeneticCodeMatchExp(geneticCode$$1);
  var geneticCodeMatchResult$$2 = getGeneticCodeMatchResult(geneticCode$$1);
  codonSequence = JAM.call(codonSequence.replace, codonSequence, [/(...)/g, v3], JAM.policy.p27);
  var codonSequenceCopy = codonSequence;
  var i$$15 = 0;
  var v346 = i$$15 < geneticCodeMatchExp$$2.length;
  for (;v346;) {
    introspect(JAM.policy.p26) {
      var v344 = geneticCodeMatchExp$$2[i$$15]
    }
    introspect(JAM.policy.p26) {
      var v345 = geneticCodeMatchResult$$2[i$$15]
    }
    codonSequence = JAM.call(codonSequence.replace, codonSequence, [v344, v345], JAM.policy.p40);
    i$$15 = i$$15 + 1;
    v346 = i$$15 < geneticCodeMatchExp$$2.length;
  }
  var codonArray = JAM.call(codonSequenceCopy.split, codonSequenceCopy, [/\s+/], JAM.policy.p28);
  codonSequence = JAM.call(codonSequence.replace, codonSequence, [/\*/g, "Z"], JAM.policy.p27);
  var proteinArray = JAM.call(codonSequence.split, codonSequence, [/\s+/], JAM.policy.p28);
  i$$15 = 0;
  var v350 = i$$15 < codonArray.length;
  for (;v350;) {
    introspect(JAM.policy.p26) {
      var v776 = proteinArray[i$$15]
    }
    var v640 = v776 == "";
    if (v640) {
      introspect(JAM.policy.p26) {
        var v777 = codonArray[i$$15]
      }
      v640 = v777 == "";
    }
    if (v640) {
      i$$15 = i$$15 + 1;
      v350 = i$$15 < codonArray.length;
      continue;
    }
    var v642 = codonTable$$5;
    introspect(JAM.policy.p26) {
      var v778 = proteinArray[i$$15]
    }
    var v643 = v778.toLowerCase();
    introspect(JAM.policy.p26) {
      var v348 = v642[v643]
    }
    introspect(JAM.policy.p26) {
      var v644 = codonArray[i$$15]
    }
    JAM.call(v348.addCodon, v348, [new Codon(v644, 0, 0, 0)], JAM.policy.p39);
    i$$15 = i$$15 + 1;
    v350 = i$$15 < codonArray.length;
  }
  return codonTable$$5;
}
function determineValues() {
  var totalAminoAcids = 0;
  var aminoAcid = 0;
  var arrayOfCodons$$2;
  var i$$16 = 0;
  var v356 = i$$16 < this.aminoAcids.length;
  for (;v356;) {
    var v647 = this.aminoAcids;
    introspect(JAM.policy.p26) {
      var v351 = v647[i$$16]
    }
    arrayOfCodons$$2 = v351.codons;
    var j$$13 = 0;
    var v354 = j$$13 < arrayOfCodons$$2.length;
    for (;v354;) {
      introspect(JAM.policy.p26) {
        var v649 = arrayOfCodons$$2[j$$13]
      }
      totalAminoAcids = totalAminoAcids + v649.number;
      introspect(JAM.policy.p26) {
        var v650 = arrayOfCodons$$2[j$$13]
      }
      aminoAcid = aminoAcid + v650.number;
      j$$13 = j$$13 + 1;
      v354 = j$$13 < arrayOfCodons$$2.length;
    }
    var v652 = this.aminoAcids;
    introspect(JAM.policy.p26) {
      var v355 = v652[i$$16]
    }
    v355.count = aminoAcid;
    aminoAcid = 0;
    i$$16 = i$$16 + 1;
    v356 = i$$16 < this.aminoAcids.length;
  }
  i$$16 = 0;
  var v364 = i$$16 < this.aminoAcids.length;
  for (;v364;) {
    var v655 = this.aminoAcids;
    introspect(JAM.policy.p26) {
      var v357 = v655[i$$16]
    }
    arrayOfCodons$$2 = v357.codons;
    j$$13 = 0;
    var v363 = j$$13 < arrayOfCodons$$2.length;
    for (;v363;) {
      introspect(JAM.policy.p26) {
        var v782 = arrayOfCodons$$2[j$$13]
      }
      if (v782.number > 0) {
        introspect(JAM.policy.p26) {
          var v358 = arrayOfCodons$$2[j$$13]
        }
        introspect(JAM.policy.p26) {
          var v783 = arrayOfCodons$$2[j$$13]
        }
        var v658 = v783.number;
        var v863 = this.aminoAcids;
        introspect(JAM.policy.p26) {
          var v784 = v863[i$$16]
        }
        v358.fraction = v658 / v784.count;
        introspect(JAM.policy.p26) {
          var v359 = arrayOfCodons$$2[j$$13]
        }
        introspect(JAM.policy.p26) {
          var v864 = arrayOfCodons$$2[j$$13]
        }
        v359.perThou = 1E3 * (v864.number / totalAminoAcids);
      } else {
        introspect(JAM.policy.p26) {
          var v360 = arrayOfCodons$$2[j$$13]
        }
        v360.fraction = 0;
        introspect(JAM.policy.p26) {
          var v361 = arrayOfCodons$$2[j$$13]
        }
        v361.perThou = 0;
      }
      j$$13 = j$$13 + 1;
      v363 = j$$13 < arrayOfCodons$$2.length;
    }
    i$$16 = i$$16 + 1;
    v364 = i$$16 < this.aminoAcids.length;
  }
  return;
}
function count() {
  var i$$17 = 0;
  var v367 = i$$17 < this.codons.length;
  for (;v367;) {
    var v365 = this.number;
    var v664 = this.codons;
    introspect(JAM.policy.p26) {
      var v366 = v664[i$$17]
    }
    this.number = v365 + v366;
    i$$17 = i$$17 + 1;
    v367 = i$$17 < this.codons.length;
  }
  return;
}
function addCodon(codon$$1) {
  var v368 = this.codons;
  JAM.call(v368.push, v368, [codon$$1], JAM.policy.p39);
  return;
}
function AminoAcid(name$$30) {
  this.name = name$$30;
  var v1270 = new Array;
  this.codons = v1270;
  this.number = 0;
  return;
}
function CodonTable() {
  var v1271 = new AminoAcid("Ala");
  this.a = v1271;
  var v1272 = new AminoAcid("Cys");
  this.c = v1272;
  var v1273 = new AminoAcid("Asp");
  this.d = v1273;
  var v1274 = new AminoAcid("Glu");
  this.e = v1274;
  var v1275 = new AminoAcid("Phe");
  this.f = v1275;
  var v1276 = new AminoAcid("Gly");
  this.g = v1276;
  var v1277 = new AminoAcid("His");
  this.h = v1277;
  var v1278 = new AminoAcid("Ile");
  this.i = v1278;
  var v1279 = new AminoAcid("Lys");
  this.k = v1279;
  var v1280 = new AminoAcid("Leu");
  this.l = v1280;
  var v1281 = new AminoAcid("Met");
  this.m = v1281;
  var v1282 = new AminoAcid("Asn");
  this.n = v1282;
  var v1283 = new AminoAcid("Pro");
  this.p = v1283;
  var v1284 = new AminoAcid("Gln");
  this.q = v1284;
  var v1285 = new AminoAcid("Arg");
  this.r = v1285;
  var v1286 = new AminoAcid("Ser");
  this.s = v1286;
  var v1287 = new AminoAcid("Thr");
  this.t = v1287;
  var v1288 = new AminoAcid("Val");
  this.v = v1288;
  var v1289 = new AminoAcid("Trp");
  this.w = v1289;
  var v1290 = new AminoAcid("Tyr");
  this.y = v1290;
  var v1291 = new AminoAcid("End");
  this.z = v1291;
  this.ala = this.a;
  this.cys = this.c;
  this.asp = this.d;
  this.glu = this.e;
  this.phe = this.f;
  this.gly = this.g;
  this.his = this.h;
  this.ile = this.i;
  this.lys = this.k;
  this.leu = this.l;
  this.met = this.m;
  this.asn = this.n;
  this.pro = this.p;
  this.gln = this.q;
  this.arg = this.r;
  this.ser = this.s;
  this.thr = this.t;
  this.val = this.v;
  this.trp = this.w;
  this.tyr = this.y;
  this.end = this.z;
  var v1292 = new Array(this.a, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.k, this.l, this.m, this.n, this.p, this.q, this.r, this.s, this.t, this.v, this.w, this.y, this.z);
  this.aminoAcids = v1292;
  return;
}
function resetValues() {
  this.number = 0;
  this.perThou = 0;
  this.fraction = 0;
  return;
}
function Codon(sequence$$18, number, perThou, fraction) {
  var v1293 = sequence$$18.toLowerCase();
  this.sequence = v1293;
  this.number = number;
  this.perThou = perThou;
  this.fraction = fraction;
  return;
}
new AminoAcid("");
AminoAcid.prototype.addCodon = addCodon;
AminoAcid.prototype.count = count;
new CodonTable;
CodonTable.prototype.determineValues = determineValues;
new Codon("", 0, 0, 0);
Codon.prototype.resetValues = resetValues;
JAM.set(document, "onload", v4);
JAM.set(JAM.call(document.getElementById, document, ["submitbtn"], JAM.policy.p24), "onclick", v5);
JAM.set(JAM.call(document.getElementById, document, ["clearbtn"], JAM.policy.p24), "onclick", v6)
