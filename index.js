const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./config/keys');

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
        accessToken => {
        console.log(accessToken);
    })
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
    })
);

// app.get('/', (req, res) => ∏
//     res.send({ Hi: 'ALLALALALLALALA'})
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT);