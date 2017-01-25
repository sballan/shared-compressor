"use strict";
const scanner_1 = require('./scanner');
class Parser {
    constructor(inputString) {
        this.scanner = new scanner_1.Scanner(inputString);
        this.inputStrings = inputString.split('').reverse();
    }
    run() {
        console.log("About to parse words: \n", this.tokens);
        this.words();
        console.log("About to parse clauses: \n", this.tokens);
        // this.clauses();
        // console.log("About to parse sentences: \n", this.tokens)
        // this.sentences()
        // console.log("About to parse paragraphs: \n")
        // this.paragraphs();
    }
    words() {
        const wordTokens = this.scanner.words();
        return wordTokens;
    }
    clauses() {
        const clauseTokens = this.scanner.clauses();
        return clauseTokens;
    }
    sentences() {
        const sentenceTokens = this.scanner.sentences();
        return sentenceTokens;
    }
    paragraphs() {
        const paragraphTokens = this.scanner.paragraphs();
        return paragraphTokens;
    }
    corpus() {
        const corpusToken = this.scanner.corpus();
        return corpusToken;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map