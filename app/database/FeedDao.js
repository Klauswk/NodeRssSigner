'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('feed.db');

class FeedDao {

    constructor() {

        this.tableName = 'feed';

        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS ${this.tableName} (URL TEXT, LAST_UPDATE INTEGER)`);
        });
    }

    getLastAccess(url) {
        const promise = new Promise((resolve, reject) => {
            db.serialize(() => {
                db.get(`SELECT * FROM ${this.tableName} where URL LIKE '${url}'`, (err, row) => {
                    if (err) {
                        console.error('Error', err);
                        reject(err);
                        return;
                    }
                    if (!row) {
                        resolve(0);
                        return;
                    }
                    resolve(new Date(row.LAST_UPDATE));
                });
            });
        });
        return promise;
    }

    insertFeed(feed) {
        console.log("Adding: ", feed);
        const promise = new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO ${this.tableName} (URL,LAST_UPDATE) VALUES(?,?)`, feed.url, feed.lastUpdate, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(feed);
                });
            });
        });
        return promise;
    }

    updateTime(feed) {
        console.log("Updating: ", feed);
        const promise = new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`UPDATE ${this.tableName} set LAST_UPDATE=${feed.lastUpdate} where URL LIKE '${feed.url}'`, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(feed);
                });
            });
        });
        return promise;
    }
}

module.exports = FeedDao;
