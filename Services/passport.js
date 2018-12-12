const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile,  done) => {
        User.findOne({googleId: profile.id}).then((existingUser) => {
            if (existingUser) {
                // we already have a user with this ID
                done(null, existingUser);
            } else {
                // we dont have a record for this ID
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
            }
        })

        
    // console.log("AccessToken " , accessToken);
    // console.log("RefreshToken " , refreshToken);
    // console.log("profile", profile);
    })
);