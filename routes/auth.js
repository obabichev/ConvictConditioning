var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res) {

    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    res.render('auth', {
        error: req.flash('error')
    });
});

router.get('/sign-out', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/vkontakte',
    passport.authenticate('vkontakte'),
    function (req, res) {
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

router.get('/vkontakte/callback',
    passport.authenticate('vkontakte', {failureRedirect: '/login'}),
    function (req, res) {
        console.log("auth: success");
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
