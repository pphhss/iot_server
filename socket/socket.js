
var net = require('net');
var config = require('../config');
var queue = [];

var socketServer = net.createServer(function(conn){
    console.log("client connect!");
    
    var iTime = imageTime();


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

            type : 1, "cid" : ?

        
        */ 
        var real_data = JSON.parse(sData.split("^DATA^")[1]);
        
        console.log(real_data);

        if(real_data.type==0){
            // if type : 0

            var cid = real_data.cid;
            var vid = real_data.vid;
            var temperature = real_data.temperature;
            var heartrate = real_data.heartrate;
            var symptominfo = real_data.symptominfo;

            DB.getConnnection(function(conn){
                var maxSid;
                conn.query("SELECT MAX(sid) FROM symptominfo_result",function(err,results){
                    //get max sid
                    if(results.length==0){
                        maxSid = 1;
                    }
                    else{
                        maxSid = results[0].sid;
                    }
                    
                });

                // register info into db.
                conn.query("INSERT INTO symptominfo_result(sid,cid,vid,temperature,heartrate,symptominfo) VALUES (?,?,?,?,?,?)"
                ,[maxSid+1,parseInt(cid),parseInt(vid),parseFloat(temperature),parseInt(heartrate),symptominfo]);

                conn.release();
            });

        }
        else{
            // if type : 1
            var cid = real_data.cid;
            var sid=0;
            DB.getConnnection(function(conn){

                //get MAX sid
                conn.query("SELECT * FROM symptom_result WHERE cid = ?",[parseInt(cid)],function(err,results){
                    for(var result in results){ // select MAX sid.
                        if(sid<result.sid){
                            sid = result.sid;
                        }   
                    }
                });

                //create row
                var url = "http://"+config.socket.address+":"+config.socket.port+"/public/images/"+sid+iTime+'.png';
                conn.query("INSERT INTO check_drug(sid,picture) VALUES (?,?)",[parseInt(sid),url]);
                
                conn.release();

            });

        }



    }

    else{
        // if it is IMAGE
        
        


        var buf = new Buffer(sData,'base64');

        console.log(buf.length);
        fs.appendFileSync('./public/images/'+sid+iTime+'.png',data);
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
module.exports = socketServer;


