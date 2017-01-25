"use strict";
const node_1 = require('./node');
class TokenNode extends node_1.Node {
    constructor(key, value, parent) {
        super(key, value, parent);
        this.map = new Map();
        this.freq = 0;
    }
    get nodes() {
        return super.nodes;
    }
    addNode(key, value, path = []) {
        return super.addNode(key, value, path);
    }
    getNode(path) {
        return super.getNode(path);
    }
    findNode(path) {
        return super.findNode(path);
    }
    has(key) {
        return this.map.has(key);
    }
    getDec(path) {
        return super.getDec(path);
    }
    getAnc() {
        return super.getAnc();
    }
}
exports.TokenNode = TokenNode;
//# sourceMappingURL=token-node.js.map