

var a = [];

var b = function(callback){
    var temp = "HELLO"
    callback(temp);
    a.push(temp);
};

var c = function(){
    console.log(a);
    return a.shift();
}

exports.b = b;
exports.c = c;



