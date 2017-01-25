"use strict";
const expr_1 = require('./expr');
class Terminal extends expr_1.Expr {
    constructor(value) {
        super(value);
        this.value = value;
        if (Terminal.all.has(value)) {
            return Terminal.all.get(value);
        }
        Terminal.all.set(value, this);
    }
    get literal() {
        return this.value;
    }
    static _toLiteral(term) {
        return term.literal;
    }
    static _toLiterals(terms) {
        return terms.map(t => this._toLiteral(t)).join('');
    }
    static toLiteral(term) {
        return Array.isArray(term) ?
            this._toLiterals(term) :
            this._toLiteral(term);
    }
}
Terminal.all = new Map();
exports.Terminal = Terminal;
class Separator extends Terminal {
    constructor(value) {
        super(value);
        this.value = value;
        if (expr_1.isChar(value))
            throw new Error('Separators cannot be Chars');
    }
    get literal() {
        return this.value;
    }
}
exports.Separator = Separator;
class Char extends Terminal {
    constructor(value) {
        super(value);
        this.value = value;
        if (!expr_1.isChar(value))
            throw new Error('Chars cannot be Separators');
    }
    get literal() {
        return this.value;
    }
}
exports.Char = Char;
//# sourceMappingURL=terminal.js.map