import { EntryDao } from './../dao/EntryDao';

export class EntryDaoImpl implements EntryDao {

    private repositoryList;
    private localFile: string;
    private dbConn;

    constructor(getConnection) {
        getConnection.then((dbConn)=>(this.dbConn = dbConn));
    }

    add(repository) {
        
    }

    remove() {
        //TODO Implement the remove
    }

    list(){
        
    }

    getById(id: string) {
        return null//this.repositoryList.find((repository)=>(repository.tag === id));
    }
}