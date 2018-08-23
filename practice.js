

var db = require('./database/database').intance();

var net = require('net');

console.log(net.isIPv4);
/*

function twoDigit(d){
    if(d<10)
        return "0"+d;
    else    
        return d;
}
function curTime(){
    var cur_time = date.getUTCFullYear()+"-"+twoDigit(date.getUTCMonth())+"-"+twoDigit(date.getUTCDate())+" "+twoDigit(date.getHours())+":"+twoDigit(date.getMinutes())+":"+twoDigit(date.getSeconds());
    return cur_time;
}
console.log(curTime());


*/


/*
db.getConnection(function(conn){
    conn.query("insert into pharmacist values (?,?,?,?,?,?,?)",[2,"hello","hello","phs",JSON.stringify(new Date()),"male","alksdf"],function(err,results,fields){
        if(err){
            throw err;
        }
        console.log(results);
        console.log(fields);
        conn.release();
    });

});

db.getConnection(function(conn){
    conn.query("UPDATE pharmacist SET token = ? WHERE pid = ?",["h123123e22",parseInt("1")],function(err,results,fields){
        console.log(results[0]);
        conn.release();
    });
   
});
*/