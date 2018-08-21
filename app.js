var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var fs = require('fs');

var net = require('net');

var FCM = require('./FCM/fcm');

var name = "";

var socketServer = net.createServer(function(conn){
  console.log("client connect!");

  var d = new Date();

  var b = d.toString().replace(":","m").replace(":","m");

  var c = b.split(" ");
  var a="";



  var i=0;
  for(i;i<5;i++){
    a = a+c[i];
  }


  conn.on('close',function(){
    console.log("disconnect");
  });

  conn.on('data',function(data){
    //console.log("CLient : "+data.toString());

    var sData = data.toString();

    if(sData.includes("^DATA^")){
      // if it is DATA

      var real_data = JSON.parse(sData.split("^DATA^")[1]);

      console.log(real_data);

      name = real_data.name;



    }

    else{
      // if it is IMAGE




      var buf = new Buffer(sData,'base64');

      console.log(buf.length);
      fs.appendFileSync('./public/images/'+name+a+'.png',data);
    }


    //conn.write(data.toString());
  });
});

socketServer.listen(8080,function(){
  console.log("socket open!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
