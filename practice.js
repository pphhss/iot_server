

var db = require('./database/database').intance();

var fm = require('./FCM/fcm');

a=1;

b = {
    hello:"안녕하세요",
    number:a
}
console.log(b);
/*
db.getConnection(function(conn){
    conn.query("SELECT token FROM pharmacist WHERE id=?",["hello"],function(err,results){
        var to = results[0].token;

        var data = {
            name:"phs",
            temperature:"36.55",
            heartrate:"50",
            symptominfo:"bad..",
            curdisease:"none"
        };

        var notification = {
            title: "phs request",
            body: "hello doctor!"
        };

        var type0 = fm.getType0(to,data,notification);
        
        type0.send();


        conn.release();
    });
});
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

db.getConnection(function(conn){
    var maxSid;
    conn.query("insert into symptominfo_result values (?,?,?,?,?,?,?,?);",[1,1,1,"1994-12-26",36.5,50,"asd","asd"],function(err,results){
        //get max sid

        /*
        if(results[0]["MAX(sid)"]===null){
            maxSid = 0;
            
        }
        else{
            maxSid = results[0]["MAX(sid)"];
            
        }
        console.log(maxSid);
    });
   
    
    conn.release();
});

*/