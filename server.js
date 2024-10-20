// pnpm run start 
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT  || 3001;

app.use(bodyParser.json())
   .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
   }))
   // this is the basic aexptress session({..}) initialization.
   .use(passport.initialize())
   // init pasport on every route call.
   .use(passport.session())
   // allow passport to use "espress-session".
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
   })
   .use(cors({ methods: ['GIT','POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
   .use(cors({ origin: '*'}))
   .use("/", require("./routes/index.js"));

   passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
   },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile);
        // });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     if (!accessToken) {
//       return done(new Error('Failed to obtain access token'));
//     }
//     return done(null, profile);
//   }
// ));


app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate(`github`, {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
    });

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        // app.listen(port, () => {console.log(`Database: ON Node: RUNNING Port: ${port}`)});
        // if you are wondering what I did here, start the code and see the your inner nerd smile ;)
        app.listen(port, () => {
            console.log(`Database: \x1b[32mCONNECTED\x1b[0m - Node: \x1b[32mRUNNING\x1b[0m - Listening: \x1b[32mPort:${port}\x1b[0m`);
            console.log(`\x1b[94mRoutes available: /guns, /suppressors\x1b[0m`);
            console.log(`\x1b[32m++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\x1b[0m`);
            // console.log(`\x1b[1m\x1b[94mStrike team\x1b[0m in \x1b[94mrange\x1b[0m. \x1b[3m\x1b[1m\x1b[37mProceed\x1b[0m with \x1b[5m\x1b[91m\x1b[1m\x1b[4mExtreme Caution!\x1b[0m`);
            console.log(`\x1b[1m\x1b[94mNeo\x1b[0m is \x1b[94mwatching\x1b[0m. \x1b[3m\x1b[1m\x1b[37mProceed\x1b[0m with \x1b[5m\x1b[91m\x1b[1m\x1b[4mcaution\x1b[0m`);
            console.log(`\n`);
            // ANSI codes
          }); 
    }
})

