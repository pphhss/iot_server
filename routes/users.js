var express = require('express');
var router = express.Router();
var net = require('net');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/loginAction',function(req,res,next){
    var userID = req.body.userID;
    var userPW = req.body.userPW;
    var token = req.body.token;

    DB.getConnection(function(conn){
      conn.query("select * from pharmacist where id = ?",[userID],function(err,results){
        if(err){ // if db is not fine..
          res.send("SERVER ERROR");
        }

        if(results.length==0){ // if id doesn't exist
          res.send("FALSE");
        }

        if(results.length!=0&&results[0].pw===userPW){ // if id exists and pw corresponds user's pw
          res.send("TRUE");
          

          conn.query("UPDATE pharmacist SET token = ? WHERE pid = ?",[req.body.token,parseInt(results[0].pid)],function(err,results){
            if(err){
              throw err;
            }

          });
        } 
        else if(results.length!=0&&results[0].pw!=userPW){ // if pw doesn't correspond user's pw.
          res.send("FALSE");
        }
          
        conn.release();
        
      });
    });
});

router.post('/reactType0',function(req,res){
  var result = req.body.result;
  var sid = req.body.sid;

  DB.getConnection(function(conn){
    conn.query("UPDATE symptominfo_result SET result = ? WHERE sid = ?",[result,parseInt(sid)],function(err,results){
      if(err){
        throw err;
      }
      conn.release();
    });
  });

  var client = net.connect(8080,"192.168.219.191",function(){
    console.log("192.168.219.191 connect!" );

    client.on('err',function(err){
      console.log(err);
    });
  });
  client.write(result);
  client.end();

  res.send("good!");
 /*
  //send Artik a data

 

 */ 

});

router.post('/reactType1',function(req,res){
  var checkpic = req.body.result;
  var sid = req.body.sid;

  DB.getConnection(function(conn){
    conn.query("UPDATE check_drug SET checkpic = ? WHERE sid = ?",[parseInt(checkpic),parseInt(sid)],function(err,results){
      if(err){
        throw err;
      }

      var client = net.connect(8080,"192.168.219.191",function(){
        console.log("192.168.219.191 connect!" );
    
        client.on('err',function(err){
          console.log(err);
        });
      });
      client.write(checkpic);
      client.end();
    
      res.send("good!");
      conn.release();

     
      /*
        send artik..
        
        
      */
      
    });
  });
});

module.exports = router;
