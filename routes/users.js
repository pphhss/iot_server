var express = require('express');
var router = express.Router();

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

module.exports = router;
