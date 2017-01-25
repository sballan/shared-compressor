"use strict";
function isChar(value) {
    return value.match(/[A-Za-z0-9]/) !== null;
}
exports.isChar = isChar;
class Expr {
    constructor(value) {
        this.value = value;
    }
    static create(value, constructor) {
        return new constructor(value);
    }
    toString() { return this.literal; }
}
exports.Expr = Expr;
//# sourceMappingURL=expr.js.map