const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Welcome to the gun and suppressor API');
});

//separate routes for guns and suppressors
router.use('/guns', require('./guns'));
router.use('/suppressors', require('./suppressors'));

// log in and log out routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
