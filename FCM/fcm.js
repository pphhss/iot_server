

var FCM = require('fcm-node');
var serverKey = "AAAA2EKtLDM:APA91bEQfAOIZEkbBgFgYdh-ZFQDHqOIB_RqNy5rrx74KE6MpYdF0cOK9K8FRtMfoRSnym-6elMCT46Cg1N3NgVjB_bifitPQJD6xGMus1W-IIa_ZI6ETsbEjJdvwkJm6jBO-CbcjS9brOUw9w5wGL1XLNGFH9f3Rg";

var fcm = new FCM(serverKey);




var send = function(to,data){
  var pushpush = {
    to:to,

    notification:{
      title:"ddddddddddd",
      body: "ajnskdjnaksdjnajksnd",
      sound:"defalut",
      click_action:"FCM_PLUGIN_ACTIVITY",
      icon: "fcm_push_icon"
    }
  };
  fcm.send(pushpush,function(err,res){
    if(err){
      console.log("ERR fcm send");
    }else{
      console.log("Success : "+res);
    }
  });

};

module.exports.send = send;
