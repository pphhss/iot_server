var d = new Date();

var b = d.toString().replace(":","m").replace(":","m");

var c = b.split(" ");
var a="";



var i=0;
for(i;i<5;i++){
  a = a+c[i];
}

console.log(a);
