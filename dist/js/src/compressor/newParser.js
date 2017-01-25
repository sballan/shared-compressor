"use strict";
function isChar(value) {
    return value.match(/[A-Za-z0-9]/) !== null;
}
exports.isChar = isChar;
class Expr {
    static create(value, constructor) {
        switch (constructor) {
            case Char:
                return new Char(value);
            case Separator:
                return new Separator(value);
            case Word:
                return new Word(value);
            default:
                throw Error('Invalid Arguments');
        }
    }
}
exports.Expr = Expr;
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
    static _toLiteral(token) {
        return token.value.literal;
    }
    static _toLiterals(tokens) {
        return tokens.map(t => this._toLiteral(t)).join('');
    }
    static toLiteral(token) {
        return Array.isArray(token) ?
            this._toLiterals(token) :
            this._toLiteral(token);
    }
    static createOne(value, constructor) {
        let expr = Expr.create(value, constructor);
        return new Token(expr);
    }
    static createMany(value, constructor) {
        return value.map(v => this.createOne(v, constructor));
    }
    static create(value, constructor) {
        if (Array.isArray(value)) {
            return this.createMany(value, constructor);
        }
        else
            return [this.createOne(value, constructor)];
    }
}
Token.all = new Map();
Token.index = new WeakMap();
exports.Token = Token;
class Terminal extends Expr {
    constructor(value) {
        super();
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
        if (isChar(value))
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
        if (!isChar(value))
            throw new Error('Chars cannot be Separators');
    }
    get literal() {
        return this.value;
    }
}
exports.Char = Char;
class Nonterminal {
    constructor(value) {
        this.value = value;
    }
    get literal() {
        return Token.toLiteral(this.value);
    }
}
exports.Nonterminal = Nonterminal;
class Word extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.Word = Word;
class Clause extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.Clause = Clause;
class Sentence extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.Sentence = Sentence;
class Paragraph extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.Paragraph = Paragraph;
class Corpus extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.Corpus = Corpus;
class Parser {
    constructor(input) {
        this.input = input.split('').reverse();
    }
    run() {
        console.log("About to scan: \n");
        this.scan();
        console.log("About to parse words: \n");
        this.words();
        console.log("About to parse clauses: \n");
        this.clauses();
        console.log("About to parse sentences: \n");
        this.sentences();
        console.log("About to parse paragraphs: \n");
        this.paragraphs();
    }
    scan() {
        this.tokens = [];
        this.input.forEach(c => {
            const token = Token.create(c, Terminal)[0];
            this.tokens.push(token);
        });
    }
    words() {
        const words = [];
        const length = this.tokens.length;
        // buffer for word being parsed
        let buffer = [];
        while (this.tokens.length > 0) {
            const token = this.tokens.pop();
            if (!(token instanceof Terminal)) {
                throw Error('Tried to parse Nonterminal as Word');
            }
            switch (true) {
                case token.value.literal === ' ':
                    const wordToken = Token.create(buffer, Word)[0];
                    words.push(wordToken, token);
                    break;
                case isChar(token.value.literal):
                    buffer.push(token);
                    break;
                default:
                    words.push(token);
                    break;
            }
        }
        return this.tokens = words.reverse();
    }
    clauses() {
        const clauses = [];
        const length = this.tokens.length;
        let buffer = [];
        while (this.tokens.length > 0) {
            const token = this.tokens.pop();
            if (!(token instanceof Word) && !(token instanceof Terminal)) {
                throw Error('Tried to parse Phrase as Word');
            }
            switch (true) {
                case token.value.literal === '.' || token.value.literal === ',':
                    const phraseToken = Token.create(buffer, Clause)[0];
                    clauses.push(phraseToken, token);
                    break;
                case isChar(token.value.literal):
                    buffer.push(token);
                    break;
                default:
                    clauses.push(token);
                    break;
            }
        }
        return this.tokens = clauses.reverse();
    }
    sentences() {
        const sentences = [];
        const length = this.tokens.length;
        let buffer = [];
        while (this.tokens.length > 0) {
            const token = this.tokens.pop();
            if (!(token instanceof Clause) && !(token instanceof Terminal)) {
                throw Error('Tried to parse Phrase as Word');
            }
            switch (true) {
                case token.value.literal === '.':
                    const sentenceToken = Token.create(buffer, Sentence)[0];
                    sentences.push(sentenceToken, token);
                    break;
                case isChar(token.value.literal):
                    buffer.push(token);
                    break;
                default:
                    sentences.push(token);
                    break;
            }
        }
        return this.tokens = sentences.reverse();
    }
    paragraphs() {
        const paragraphs = [];
        const length = this.tokens.length;
        let buffer = [];
        while (this.tokens.length > 0) {
            const token = this.tokens.pop();
            if (!(token instanceof Sentence) && !(token instanceof Terminal)) {
                throw Error('Tried to parse Sentence as Clause');
            }
            switch (true) {
                case token.value.literal === '\n\n':
                    const paragraphToken = Token.create(buffer, Paragraph)[0];
                    paragraphs.push(paragraphToken, token);
                    break;
                case isChar(token.value.literal):
                    buffer.push(token);
                    break;
                default:
                    paragraphs.push(token);
                    break;
            }
        }
        return this.tokens = paragraphs.reverse();
    }
}
exports.Parser = Parser;
//# sourceMappingURL=newParser.js.map