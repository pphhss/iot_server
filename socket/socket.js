
var net = require('net');
var config = require('../config');
var fs = require('fs');

var iTime = "";
var sid_checK_drug = 0;
var socketServer = net.createServer(function(conn){
    console.log("client connect!");
    
    


    conn.on('close',function(){
    console.log("disconnect");
    });

    conn.on('data',function(data){
    //console.log("CLient : "+data.toString());

    var sData = data.toString();

    if(sData.includes("^DATA^")){
        // if it is DATA
        
        /*
            #DATA TYPE
            type: 0, "cid" : ?, "vid" : ?, temperature : ?, heartrate : ?, symptominfo : ?

            type : 1, "cid" : ?:

        
        */ 
        var real_data = JSON.parse(sData.split("^DATA^")[1]);
        
        console.log(real_data);

        if(real_data.type=='0'){
            // if type : 0

            console.log("type : 0");

            var cid = real_data.cid;
            var vid = real_data.vid;
            var temperature = real_data.temperature;
            var heartrate = real_data.heartrate;
            var symptominfo = real_data.symptominfo;
            
            DB.getConnection(function(conn){
                var maxSid;
                conn.query("SELECT MAX(sid) FROM symptominfo_result",function(err,results){
                    //get max sid
                    if(err){
                        throw err;
                    }
                    if(results[0]["MAX(sid)"]===null){
                        maxSid = 0;
                        
                    }
                    else{
                        maxSid = results[0]["MAX(sid)"];
                        
                    }
                    console.log("maxSid : "+maxSid);
                    
                    //insert sympotominfo_result
                    conn.query("INSERT INTO symptominfo_result(sid,cid,vid,time,temperature,heartrate,symptominfo) VALUES (?,?,?,?,?,?,?)"
                    ,[maxSid+1,parseInt(cid),parseInt(vid),curTime(),parseFloat(temperature),parseInt(heartrate),symptominfo],function(err,results){
                    if(err){
                        throw err;
                    }
                        // get name, curdisease of customer
                        conn.query("SELECT name,currentdisease FROM customer WHERE cid = ?",[parseInt(cid)],function(err,results){
                            if(err){
                                throw err;
                            }
                            var name = results[0].name;
                            var curdisease = results[0].currentdisease;

                            //get token of pharmacist who is in charge of vendingmachine.
                            conn.query("SELECT p.token FROM pharmacist as p, vendingmachine as v WHERE v.vid = ? AND v.pid=p.pid",[parseInt(vid)]
                            ,function(err,results){
                                if(err){
                                    throw err;
                                }
                                var to = results[0].token;

                                var data = {
                                    name: name,
                                    temperature: temperature.toString(),
                                    heartrate: heartrate.toString(),
                                    symptominfo: symptominfo,
                                    curdisease: curdisease
                                };

                                var notification = {
                                    title: "처방 요청",
                                    body: name+"님의 요청입니다"
                                };
                                console.dir(notification);

                                // create object(Type0) and send by fcm.
                                var type0 = FM.getType0(to,data,notification);
                                type0.send();

                                conn.release();
                            });
                        });

                    });

                   

                });

                //console.log((maxSid+1)+"/"+parseInt(cid)+"/"+parseInt(vid)+"/"+curTime()+"/"+parseFloat(temperature)+"/"+parseInt(heartrate)+"/"+symptominfo);
                // register info into db.
                

                
            });

        }
        else{
            // if type : 1
            var cid = real_data.cid;
            console.log("type : 1");
            DB.getConnection(function(conn){

                //get MAX sid               
               conn.query("SELECT MAX(sid) FROM symptominfo_result WHERE cid = ?",[parseInt(cid)],function(err,results){
                   //get max sid
                   if(err){
                       throw err;
                   }
                   
                   
                    sid_checK_drug = results[0]["MAX(sid)"];
                       
                   
                   console.log("maxSid : "+sid_checK_drug);
                       
                   
                   //create row
                   iTime = imageTime();
                   var url = "http://"+config.socket.address+":"+config.socket.port+"/public/images/"+sid_checK_drug+iTime+'.png';

                   conn.query("INSERT INTO check_drug(sid,picture) VALUES (?,?)",[parseInt(sid_checK_drug),url],function(err,results){
                      if(err){
                           throw err;
                        }  
                        conn.release();
                  });
                
                   
                
                });

               

            });

        }



    }

    else{
        // if it is IMAGE
        
        


        var buf = new Buffer(sData,'base64');

        console.log(buf.length);
        fs.appendFileSync('./public/images/'+sid_checK_drug+iTime+'.png',data);
    }


    //conn.write(data.toString());
    });
});

var imageTime = function(){
    var d = new Date();

    var b = d.toString().replace(":","m").replace(":","m");

    var c = b.split(" ");
    var a="";



    var i=0;
    for(i;i<5;i++){
    a = a+c[i];
    }
    return a;
}

function twoDigit(d){
    if(d<10)
        return "0"+d;
    else    
        return d;
}
function curTime(){
    var date = new Date();
    var cur_time = date.getUTCFullYear()+"-"+twoDigit(date.getUTCMonth())+"-"+twoDigit(date.getUTCDate())+" "+twoDigit(date.getHours())+":"+twoDigit(date.getMinutes())+":"+twoDigit(date.getSeconds());
    return cur_time;
}


module.exports = socketServer;


