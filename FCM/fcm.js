

var FCM = require('fcm-node');
var serverKey = "AAAA2EKtLDM:APA91bEQfAOIZEkbBgFgYdh-ZFQDHqOIB_RqNy5rrx74KE6MpYdF0cOK9K8FRtMfoRSnym-6elMCT46Cg1N3NgVjB_bifitPQJD6xGMus1W-IIa_ZI6ETsbEjJdvwkJm6jBO-CbcjS9brOUw9w5wGL1XLNGFH9f3Rg";

var fcm = new FCM(serverKey);

function Type0(to,data,notification){
  this.pushpush = {
    to:to,

    notification:{
      title: notification.title,
      body: notification.body,
      sound: "default",
      click_action: ".ConsentTypeZeroActivity",
      icon: "fcm_push_icon"
    },
    data:{
      type: "0",
      name: data.name,
      temperature: data.temperature,
      heartrate: data.heartrate,
      symptominfo: data.symptominfo,
      curdisease: data.curdisease,
      title: notification.title,
      body: notification.body
    }
  };
}
Type0.prototype.send = function(){
  console.log(this.pushpush);
  fcm.send(this.pushpush,function(err,res){
  if(err){
    throw err;
  }
  console.log(res);

});
};



var fcmManager = {};

fcmManager.getType0 = function(to,data,notification){
  console.log("FCM");
  console.log(to);
  console.dir(data);
  console.dir(notification);
  return new Type0(to,data,notification);
};


module.exports = fcmManager;
