"use strict";
const tokens_1 = require('../tokens');
class WordScanner {
    constructor(input) {
        this.input = input;
        // public cache: Array<Token<Word | Separator>>;
        this.buffer = [];
        this.words = [];
    }
    run() {
        while (this.input.length > 0) {
            const token = this.input.pop();
            if (!(token.value instanceof tokens_1.Terminal)) {
                throw Error('Tried to parse Nonterminal as Word');
            }
            if (token.value instanceof tokens_1.Separator) {
                if (this.buffer.length > 0) {
                    const wordToken = tokens_1.Token.create(this.buffer, tokens_1.Word);
                    this.words.push(wordToken);
                }
                this.words.push(token);
                this.buffer = [];
            }
            else if (token.value instanceof tokens_1.Char) {
                this.buffer.push(token);
            }
            else {
                console.log(token);
                throw Error('Wrong arguments to words()');
            }
        }
        return this.words.reverse();
    }
}
exports.WordScanner = WordScanner;
//# sourceMappingURL=word-scanner.js.map