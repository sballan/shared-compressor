"use strict";
const tokens_1 = require('../tokens');
function isChar(value) {
    return value.match(/[A-Za-z0-9]/) !== null;
}
class Scanner {
    constructor(inputString) {
        this.inputString = inputString;
        // public cache: Array<Token<Word | Separator>>;
        this.buffer = [];
        this.tokens = [];
        this.inputTokens = [];
        this.terminals(inputString);
    }
    terminals(inputString = this.inputString) {
        inputString.split('').forEach(c => {
            let token;
            if (isChar(c))
                token = tokens_1.Token.create(c, tokens_1.Char);
            else
                token = tokens_1.Token.create(c, tokens_1.Separator);
            this.inputTokens.push(token);
        });
    }
    words() {
        this.tokens = [];
        while (this.inputTokens.length > 0) {
            this.current = this.inputTokens.pop();
            if (!(this.current.value instanceof tokens_1.Terminal)) {
                throw Error('Tried to parse Nonterminal as Word');
            }
            if (this.current.value instanceof tokens_1.Separator) {
                if (this.buffer.length > 0) {
                    const wordToken = tokens_1.Token.create(this.buffer, tokens_1.Word);
                    this.tokens.push(wordToken);
                }
                this.tokens.push(this.current);
                this.buffer = [];
            }
            else if (this.current.value instanceof tokens_1.Char) {
                this.buffer.push(this.current);
            }
            else {
                console.log(this.current);
                throw Error('Wrong arguments to words()');
            }
        }
        return this.inputTokens = this.tokens.reverse();
    }
    clauses() {
        this.tokens = [];
        while (this.inputTokens.length > 0) {
            const current = this.inputTokens.pop();
            if (!(current.value instanceof tokens_1.Word) && !(current.value instanceof tokens_1.Separator)) {
                throw Error('Tried to parse Phrase as Word');
            }
            if (current.value instanceof tokens_1.Separator) {
                if (current.value.literal === '.' || current.value.literal === ',') {
                    if (this.buffer.length > 0) {
                        const clauseToken = tokens_1.Token.create(this.buffer, tokens_1.Clause);
                        this.tokens.push(clauseToken);
                        this.buffer = [];
                    }
                    this.buffer.push(current);
                }
            }
            else if (current.value instanceof tokens_1.Word) {
                this.buffer.push(current);
            }
            else {
                console.log(current);
                throw Error('Wrong arguments to words()');
            }
        }
        if (this.buffer.length > 0) {
            const clauseToken = tokens_1.Token.create(this.buffer, tokens_1.Clause);
            this.tokens.push(clauseToken);
            this.buffer = [];
        }
        return this.inputTokens = this.tokens.reverse();
    }
    sentences() {
        this.tokens = [];
        while (this.inputTokens.length > 0) {
            const current = this.inputTokens.pop();
            if (!(current.value instanceof tokens_1.Clause) && !(current.value instanceof tokens_1.Separator)) {
                throw Error('Tried to parse Phrase as Word');
            }
            if (current.value instanceof tokens_1.Separator) {
                if (current.value.literal === '.') {
                    if (this.buffer.length > 0) {
                        const sentenceToken = tokens_1.Token.create(this.buffer, tokens_1.Sentence);
                        this.tokens.push(sentenceToken);
                        this.buffer = [];
                    }
                    this.buffer.push(current);
                }
            }
            else if (current.value instanceof tokens_1.Clause) {
                this.buffer.push(current);
            }
            else {
                console.log(current);
                throw Error('Wrong arguments to sentences()');
            }
        }
        if (this.buffer.length > 0) {
            const clauseToken = tokens_1.Token.create(this.buffer, tokens_1.Sentence);
            this.tokens.push(clauseToken);
            this.buffer = [];
        }
        return this.inputTokens = this.tokens.reverse();
    }
    paragraphs() {
        this.tokens = [];
        while (this.inputTokens.length > 0) {
            const current = this.inputTokens.pop();
            if (!(current.value instanceof tokens_1.Sentence) && !(current.value instanceof tokens_1.Separator)) {
                throw Error('Tried to parse Paragraph as Sentence');
            }
            if (current.value instanceof tokens_1.Separator) {
                if (current.value.literal === '\n\n') {
                    if (this.buffer.length > 0) {
                        const paragraphToken = tokens_1.Token.create(this.buffer, tokens_1.Sentence);
                        this.tokens.push(paragraphToken);
                        this.buffer = [];
                    }
                    this.buffer.push(current);
                }
            }
            else if (current.value instanceof tokens_1.Sentence) {
                this.buffer.push(current);
            }
            else {
                console.log(current);
                throw Error('Wrong arguments to paragraphs()');
            }
        }
        if (this.buffer.length > 0) {
            const paragraphToken = tokens_1.Token.create(this.buffer, tokens_1.Paragraph);
            this.tokens.push(paragraphToken);
            this.buffer = [];
        }
        return this.inputTokens = this.tokens.reverse();
    }
    corpus() {
        this.tokens = [];
        while (this.inputTokens.length > 0) {
            const current = this.inputTokens.pop();
            if (!(current.value instanceof tokens_1.Paragraph) && !(current.value instanceof tokens_1.Separator)) {
                throw Error('Tried to parse Corpus as Paragraph');
            }
            if (current.value instanceof tokens_1.Paragraph) {
                this.buffer.push(current);
            }
            else if (current.value instanceof tokens_1.Separator) {
                this.buffer.push(current);
            }
            else {
                throw Error('Wrong arguments to corpus()');
            }
        }
        if (this.buffer.length > 0) {
            const corpusToken = tokens_1.Token.create(this.buffer, tokens_1.Corpus);
            this.tokens.push(corpusToken);
            this.buffer = [];
        }
        else {
            throw Error("Buffer should not be empty");
        }
        if (this.tokens.length > 1)
            throw Error("Buffer overflow");
        this.inputTokens = this.tokens.reverse();
        return this.inputTokens[0];
    }
}
exports.Scanner = Scanner;
//# sourceMappingURL=scanner.js.map