function snipDisplay(c, p) {
  var v1;
  if(document.getElementById(c).checked == true) {
    var v13 = document.getElementById(p).style;
    introspect(JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD) {
      v1 = v13.display = "block"
    }
  }else {
    var v14 = document.getElementById(p).style;
    introspect(JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD) {
      v1 = v14.display = "none"
    }
  }
  v1;
  return
}
function initSnippets() {
  function v0() {
    snipDisplay("c1", "s1");
    return
  }
  var d = document;
  JAM.set(document.getElementById("c1"), "onclick", v0, JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD);
  return
}
function snapDisplay(c$$1) {
  var d$$1 = document;
  if(document.getElementById(c$$1).innerHTML == "Show All") {
    JAM.set(document.getElementById(c$$1), "innerHTML", "Hide All", JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD);
    var i$$1 = 1;
    var v6 = i$$1 <= 31;
    for(;v6;) {
      var v4 = document.getElementById("c" + i$$1);
      introspect(JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD) {
        v4.checked = true
      }
      var v5 = document.getElementById("s" + i$$1).style;
      introspect(JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD) {
        v5.display = "block"
      }
      i$$1 = i$$1 + 1;
      v6 = i$$1 <= 31
    }
  }else {
    JAM.set(document.getElementById(c$$1), "innerHTML", "Show All", JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD);
    i$$1 = 1;
    var v10 = i$$1 <= 31;
    for(;v10;) {
      var v8 = document.getElementById("c" + i$$1);
      introspect(JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD) {
        v8.checked = false
      }
      var v9 = document.getElementById("s" + i$$1).style;
      introspect(JAM.policy.pAF65661CDDA02BEF577B9796994F429B325DEECD) {
        v9.display = "none"
      }
      i$$1 = i$$1 + 1;
      v10 = i$$1 <= 31
    }
  }
  return
}
initSnippets();
document.getElementById("c1").onclick();

