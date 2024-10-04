const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT  || 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

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

