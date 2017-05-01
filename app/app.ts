import { RepositoryLocalDao } from "./impl/RepositoryLocalDao";
import * as noderssparser from "noderssparser";
import * as https from 'https';
import * as http from 'http';

let repositoryDao = new RepositoryLocalDao(process.env.npm_package_config_fileLocation);

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
        console.log(result);
    }
});
