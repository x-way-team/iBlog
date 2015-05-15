var express = require('express');//
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//config init
var config = require('./services/config').load('./config.json', function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}).data;

var db = require("./services/db")
.error(function(err){
    console.log(err);
}).config(config.db.url, config.db.options)
.start();

//cache init
var cache = require("./services/cache");
cache.init(function(err){
    console.error(err);
    process.exit(1);
});

var routes = require('./routes/index');
var apiUsers = require('./routes/users');
var apiSessions = require('./routes/sessions');
var apicontents = require('./routes/contents');

var app = express();

// view engine setup制定规则
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/iblog-16.png'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', apiUsers);
app.use('/api/session', apiSessions);

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

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('listening on port %d', server.address().port);
});

module.exports = app;
