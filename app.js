var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var routes = require('./routes/index');
var pushup = require('./routes/pushup');
var auth = require('./routes/auth');

var app = express();

var credentials = require('./credentials');

require('./boot/index')(app);

app.use('/', routes);
app.use('/pushup', pushup);
app.use('/auth', auth);

app.get('/login', function (req, res, next) {
    res.render('index');
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};

switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Неизвестная среда выполнения: ' + app.get('env'));
}

module.exports = app;
