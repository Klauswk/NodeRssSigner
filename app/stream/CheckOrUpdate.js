'use strict';

const { Transform } = require('stream');
const parser = require('noderssparser');

class CheckOrUpdate extends Transform {
    constructor(url, feedDao) {
        super();
        this.setEncoding('utf8');
        this.url = url;
        this.feedDao = feedDao;
    }

    async _transform(chunk, enc, next) {
        const result = parser(chunk.toString('utf8'));
        const { url, feedDao } = this;

        const dd = new Date(result.lastBuildDate);

        const lastUpdate = await feedDao.getLastAccess(url);

        if (lastUpdate === 0) {
            await feedDao.insertFeed({ url, lastUpdate: dd.getTime() });
            this.push(JSON.stringify(result));
        } else if(dd.getTime > lastUpdate){
            await feedDao.updatedFeed({ url, lastUpdate: dd.getTime() });
            this.push(JSON.stringify(result));
        }

        next();
    }

    _flush() {
        this.push(null);
    }
}

module.exports = CheckOrUpdate;
