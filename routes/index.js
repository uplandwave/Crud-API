const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Welcome to the gun and suppressor API');
});

//separate routes for guns and suppressors
router.use('/guns', require('./guns'));
router.use('/suppressors', require('./suppressors'));

module.exports = router;
