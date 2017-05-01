import Repository from './../rss/Repository';

export interface RepositoryDao {
    add(rss : Repository) : void;
    remove: Function;
    getById(id: string) : Repository;
    list(): Array<Repository>;
}