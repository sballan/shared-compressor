"use strict";
const node_1 = require('./node');
const sym_1 = require('../scanner/sym');
class WordNode extends node_1.Node {
    addNode(key, value, path = []) {
        const node = super.addNode(key, value);
        node.freq++;
        if (path.length > 0)
            super.addNode(key, value, path).freq++;
        return node;
    }
    addWord(wordString, path = []) {
        // if first argument is array, then we are adding a chain
        if (Array.isArray(wordString) && wordString.length > 1) {
            path = wordString;
            wordString = path.pop();
        }
        else if (Array.isArray(wordString)) {
            wordString = wordString[0];
            path = [];
        }
        let word = this.getWord(wordString) || new sym_1.Word(wordString);
        return this.addNode(wordString, word, path);
    }
    getWord(wordString) {
        let node = this.map.get(Symbol.for(wordString));
        return node ? node.value : undefined;
    }
    getWordNode(path) {
        return super.getNode(path);
    }
    has(wordString) {
        return super.has(wordString);
    }
    hasPath(path) {
        return !!super.getNode(path);
    }
    pathFrequency(path) {
        return this.getWordNode(path).freq;
    }
    getMostFrequent(num = 20) {
        return this.nodes.sort((a, b) => {
            return a.freq - b.freq;
        }).slice(0, num);
    }
}
exports.WordNode = WordNode;
//# sourceMappingURL=word-node.js.map