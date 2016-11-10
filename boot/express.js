var express = require('express');
var path = require('path');
var expressHbs = require('express3-handlebars');
var passport = require('passport');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressSession = require('express-session');

var sessionOptions = {
    name: "name",
    "secret": "it:demo:secret",
    "key": "sid",
    maxAge: 36000000,
    httpOnly: false,
    resave: true,
    saveUninitialized: true
    // "cookie": {
    //     "path": "/",
    //     "httpOnly": true,
    //     "maxAge": null
    // }
};

module.exports = function (app) {

    app.set('views', path.join(__dirname, '..', 'views'));

    app.engine('hbs', expressHbs({
        extname: 'hbs',
        defaultLayout: 'layout.hbs',
        helpers: {
            json: function (context) {
                return JSON.stringify(context);
            }
        }
    }));
    app.set('view engine', 'hbs');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(expressSession(sessionOptions));

    app.use(passport.initialize());
    app.use(passport.session());

};