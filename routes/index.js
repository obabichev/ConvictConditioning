var express = require('express');
var router = express.Router();

var home = require('./home');
var pushup = require('./pushup');
var auth = require('./auth');

module.exports = router;

module.exports = function (app) {
    app.use('/', home);
    app.use('/auth', auth);
    app.use('/pushup', pushup);

    require('./error')(app);
};