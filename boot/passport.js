var passport = require('passport');
var AuthVKStrategy = require('passport-vkontakte').Strategy;
var User = require('../models/user');


passport.use(new AuthVKStrategy({
        clientID: "5704339",
        clientSecret: "lW5pbTrWcwWfiyj6cLSn",
        callbackURL: "http://localhost:3000/auth/vkontakte/callback"
    },
    function (accessToken, refreshToken, profile, done) {

        console.log(JSON.stringify(profile));

        return done(null, {
            id:profile.id,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            photo: profile.photos[0].value
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};