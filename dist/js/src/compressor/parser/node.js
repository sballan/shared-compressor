"use strict";
const s = new Node();
class Node {
    constructor(key, value, parent) {
        this.map = new Map();
        this.freq = 0;
        this.key = key;
        this.value = value;
        this.parent = parent;
    }
    get nodes() {
        const nodes = [];
        this.map.forEach(n => nodes.push(n));
        return nodes;
    }
    addNode(key, value, path = []) {
        if (path.length > 0) {
            return this.findNode(path).addNode(key, value);
        }
        else if (this.map.has(key))
            return this.map.get(key);
        else {
            this.map.set(key, new Node(key, value, this));
            return this.map.get(key);
        }
    }
    getNode(path) {
        if (Array.isArray(path))
            return this.findNode(path);
        return this.map.get(path);
    }
    findNode(path) {
        const length = path.length;
        let map = this.map;
        let currentNode = this;
        for (let i = 0; i < length; i++) {
            currentNode = map.get(path[i]);
            map = currentNode ? currentNode.map : undefined;
        }
        return currentNode;
    }
    has(key) {
        return this.map.has(key);
    }
    getDec(path) {
        let length = path.length;
        const nodes = [];
        let current = this;
        for (let i = 0; i < length; i++) {
            current = current.getNode(path[i]);
            nodes.push(current);
        }
        return nodes;
    }
    getAnc() {
        const nodes = [];
        let currentNode = this;
        while (currentNode.parent) {
            currentNode = currentNode.parent;
            nodes.push(currentNode);
        }
        return nodes;
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map