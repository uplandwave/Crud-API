const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let databace;

const initDb = (callback) => {
    if (databace) {
        console.log('Db is already initiaized!');
        return callback(null, databace);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        databace = client;
        callback(null, databace);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDatabace = () => {
    if (!databace) {
        throw Error('Databace not Initialized')
    }
    return databace;
};

module.exports = {
    initDb,
    getDatabace
};
