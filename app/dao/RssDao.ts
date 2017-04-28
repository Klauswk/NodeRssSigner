import Rss from './../rss/Rss';

export interface RssDao {
    add(rss : Rss);
    remove: Function;
    getById(id: string) : Rss;
    list: Function;
}