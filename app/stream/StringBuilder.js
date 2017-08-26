const { Transform } = require('stream');

class StringBuilder extends Transform {
    constructor(options) {
        super(options);

        this.result = '';
        this.setEncoding('utf8');
    }

    _transform(chunk, enc, next) {
        this.result = this.result + chunk.toString();
        next();
    }

    _flush() {
        this.push(this.result);
    }
}

module.exports = StringBuilder;
