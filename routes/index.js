var express = require('express');
var router = express.Router();

var Pushup = require('../models/Pushup');

router.get('/', function (req, res) {
    console.log("USER:" + JSON.stringify(req.user));
    res.render('index', {
        user: req.user,
        auth: req.isAuthenticated()
    });
});

module.exports = router;