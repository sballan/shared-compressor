"use strict";
const expr_1 = require('./expr');
const terminal_1 = require('./terminal');
const nonterminal_1 = require('./nonterminal');
class Token {
    constructor(value) {
        this.value = value;
        if (Token.index.has(value)) {
            const key = Token.index.get(value);
            return Token.all.get(key);
        }
        this.key = Symbol();
        Token.all.set(this.key, this);
        Token.index.set(value, this.key);
    }
    get literal() { return this.value.literal; }
    toString() {
        return `Token: ${this.literal}`;
    }
    static _toLiteral(token) {
        if (token.value instanceof terminal_1.Terminal) {
            return token.literal;
        }
        else if (token.value instanceof nonterminal_1.Nonterminal) {
            return this._toLiterals(token.value.value);
        }
    }
    static _toLiterals(tokens) {
        return tokens.map(t => this._toLiteral(t)).join('');
    }
    static toLiteral(token) {
        return Array.isArray(token) ?
            this._toLiterals(token) :
            this._toLiteral(token);
    }
    static create(value, constructor) {
        let expr = expr_1.Expr.create(value, constructor);
        return new Token(expr);
    }
    static createMany(value, constructor) {
        return value.map(v => this.create(v, constructor));
    }
}
Token.all = new Map();
Token.index = new WeakMap();
exports.Token = Token;
//# sourceMappingURL=token.js.map