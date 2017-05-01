
export default class Repository {

    tag: string;
    url: string;

    constructor(tag: string, url: string) {
        this.tag = tag;
        this.url = url;
    }
}