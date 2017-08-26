'use strict';

const http = require('http');
const https = require('https');
const StringBuilder = require('./stream/StringBuilder');
const CheckOrUpdate = require('./stream/CheckOrUpdate');
const UpdateContent = require('./stream/UpdateContent');
const FeedDao = require('./database/FeedDao');
const input = new StringBuilder();
const feedDao = new FeedDao();

const getContent = (url) => {
    if (url.indexOf("https") > -1) {
        https.get(url, (res) => {
            res.pipe(input)
               .pipe(new CheckOrUpdate(url, feedDao))
               .pipe(new UpdateContent(url));
        });
    } else if(url.indexOf('http') > -1) {
        http.get(url, (res) => {
            res.pipe(input)
               .pipe(new CheckOrUpdate(url, feedDao))
               .pipe(new UpdateContent(url));
        });
    }
};

getContent("http://www.javaworld.com/index.rss");
