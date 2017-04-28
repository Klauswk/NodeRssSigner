import { RssDao } from './../dao/RssDao';
import * as fs from 'fs';
import Rss from "../rss/Rss";

export default class RssLocalDao implements RssDao {

    private rssList : Array<Rss>;
    private localFile : string;

    constructor(localFile : string){
        this.localFile = localFile;
        this.rssList = JSON.parse(fs.readFileSync(localFile).toString());
    }

    add(rss : Rss) {
        fs.appendFileSync(this.localFile,rss);
    }

    remove() {

    }

    list() {

    }

    getById(id: string): Rss {
        return null;
    }
}