// apply0.js
introspect(JAM.policy.p1) {
  x = 1;
}
var e = eval;
JAM.call(e.apply, e, [null, ["x = 2"]]);
alert(x)
