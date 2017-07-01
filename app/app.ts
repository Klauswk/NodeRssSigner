import { RepositoryLocalDao } from "./impl/RepositoryLocalDao";
import { EntryDaoImpl } from "./impl/EntryDaoImpl";
import { getConnection } from './mongo/mongoConnection';
import * as https from 'https';
import * as http from 'http';
import * as noderssparser from "noderssparser";

let repositoryDao = new RepositoryLocalDao(process.env.npm_package_config_fileLocation);
let entryDaoImpl = new EntryDaoImpl(getConnection());

repositoryDao.list().forEach((repository) => {
    let body = '';
    if (repository.url.indexOf("https") > -1) {
        https.get(repository.url, (res) => {
            res.on('data', onData);
            res.on('end', onEnd);
        });
    } else {
        http.get(repository.url, (res) => {
            res.on('data', onData);
            res.on('end', onEnd);
        });
    }

    function onData(d) {
        body += d;
    }
    function onEnd() {
        let result = noderssparser(body);
    }
});
