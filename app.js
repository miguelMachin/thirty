const redSocial = require('./controller/redSocialController');
var express = require('express');
var socket_io = require( "socket.io" );
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const multer  = require('multer');
const crypto = require('crypto');
const session = require('express-session');

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var io = socket_io();
app.io = io;
// view engine setup

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

//var upload = multer({ storage: storage })

app.set('views', path.join(__dirname, 'views'));
/*app.set('views', path.join(__dirname, 'views/views'));
app.set('partial', path.join(__dirname, 'views/partial'));*/

app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: storage }).single('img'));
//app.use(multer({dest: './uploads/'}).single('img'));
//app.use(multer({ dest: './uploads/'}));






app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


io.on('connection', function(socket){
  console.log('A client connection occurred!');
});


module.exports = app;
