const { Transform } = require('stream');

class UpdateContent extends Transform {
    constructor(url) {
        super();
        this.setEncoding('utf8');
        this.url = url;
    }

    _transform(chunk, enc, next) {
        const result = chunk.toString('utf8');
        console.log(result);

        next();
    }

    _flush() {
        this.push(null);
    }
}

module.exports = UpdateContent;
