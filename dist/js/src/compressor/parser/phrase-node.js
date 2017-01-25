"use strict";
const node_1 = require('./node');
class PhraseNode extends node_1.Node {
    constructor(wordNode) {
        super();
        this.wordNode = wordNode;
    }
    phraseToKey(phraseStrings) {
        return phraseStrings.join(' ');
    }
    addNode(key, value, path = []) {
        const node = super.addNode(key, value);
        node.freq++;
        if (path.length > 0)
            super.addNode(key, value, path).freq++;
        return node;
    }
    // A path is always an array of key: string
    addPhrase(phraseStrings, path = []) {
        // if (phraseStrings.length > 1 && !!phraseStrings[0][0]) {
        // 		path = phraseStrings;
        // 		phraseStrings = phraseStrings.pop();
        // } else if(Array.isArray(phraseStrings)) {
        // 		phraseStrings = phraseStrings[0];
        // 		path = [];
        // }
        const phraseKey = this.phraseToKey(phraseStrings);
        const phraseWords = phraseStrings.map(p => {
            return this.wordNode.addWord(p).value;
        });
        this.addNode(phraseKey, phraseWords, path);
    }
    getPhrase(phraseStrings) {
        const phraseKey = this.phraseToKey(phraseStrings);
        return this.map.get(phraseKey).value;
    }
    getPhraseNode(path) {
        return super.getNode(path);
    }
    has(phraseKey) {
        return super.has(phraseKey);
    }
    hasPath(path) {
        return !!super.getNode(path);
    }
    pathFrequency(path) {
        return this.getPhraseNode(path).freq;
    }
    getMostFrequent(num = 20) {
        return this.nodes.sort((a, b) => {
            return a.freq - b.freq;
        }).slice(0, num);
    }
}
exports.PhraseNode = PhraseNode;
//# sourceMappingURL=phrase-node.js.map