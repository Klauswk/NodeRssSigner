const mongo = require('mongodb').MongoClient;
let dbConn = process.env.npm_package_config_dbConn;
let db;

export function getConnection() {
    let promise = new Promise(function (resolve, reject) {
        if (isConnected()) {
            resolve(db);
        } else {
            mongo.connect(dbConn, (err, database) => {

                if (err) {
                    reject(err);
                } else {
                    db = database;
                    resolve(db);
                }
            });
        }
    })
    return promise;
}

export function isConnected() {
    return !!db;
}
