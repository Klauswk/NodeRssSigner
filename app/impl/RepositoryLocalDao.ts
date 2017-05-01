import { RepositoryDao } from './../dao/RepositoryDao';
import * as fs from 'fs';
import Repository from "../rss/Repository";

export class RepositoryLocalDao implements RepositoryDao {

    private repositoryList: Array<Repository>;
    private localFile: string;

    constructor(localFile: string) {
        this.localFile = localFile;
        this.repositoryList = JSON.parse(fs.readFileSync(localFile).toString());
    }

    add(repository: Repository) {
        this.repositoryList.push(repository);
        fs.writeFileSync(this.localFile, this.repositoryList);
    }

    remove() {
        //TODO Implement the remove
    }

    list() : Array<Repository> {
        return this.repositoryList;
    }

    getById(id: string): Repository {
        return null//this.repositoryList.find((repository)=>(repository.tag === id));
    }
}