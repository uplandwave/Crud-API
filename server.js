// Add this if you're using a .env file
// require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

// Ensure you're reading these environment variables
const port = process.env.PORT  || 3001;
const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const githubCallbackURL = process.env.CALLBACK_URL;

if (!githubClientID || !githubClientSecret || !githubCallbackURL) {
    console.error('Missing GitHub OAuth configuration.');
    process.exit(1);
}

app.use(bodyParser.json())
   .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
   }))
   .use(passport.initialize())
   .use(passport.session())
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
   })
   .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
   .use(cors({ origin: '*'}))
   .use("/", require("./routes/index.js"));

// OAuth strategy
passport.use(new GitHubStrategy({
    clientID: githubClientID,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackURL
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database: CONNECTED - Node: RUNNING - Listening: Port: ${port}`);
        });
    }
});
