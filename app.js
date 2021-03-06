var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// passport
var passport = require('passport');
// middleware for flash messages
var flash = require('flash');


// db config

var dbconf = require('./config/db');
// Routes
var routes = require('./routes/index');
var articles = require('./routes/articles');

var app = express();

// passport config

// require('./config/passport')(passport);
// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect(dbconf.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware

app.use(session({
    secret: 'my_blog',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// routes
app.use('/', routes);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
