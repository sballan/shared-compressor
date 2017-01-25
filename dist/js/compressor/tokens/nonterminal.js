"use strict";
const expr_1 = require('./expr');
class Nonterminal extends expr_1.Expr {
    constructor(value) {
        super(value);
        this.value = value;
    }
    get literal() { }
    toString() { return this.literal; }
    ;
}
exports.Nonterminal = Nonterminal;
class Word extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
    get literal() {
        console.log("WORD", this.value[0]);
        return this.value.map(v => v.literal).join('');
    }
    toString() { return this.literal; }
    ;
}
exports.Word = Word;
class Clause extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
    get literal() {
        console.log("CLAUSE");
        return this.value.map(v => v.literal).join('');
    }
}
exports.Clause = Clause;
class Sentence extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
    get literal() {
        return this.value.map(v => v.literal).join('');
    }
}
exports.Sentence = Sentence;
class Paragraph extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
    get literal() {
        return this.value.map(v => v.literal).join('');
    }
}
exports.Paragraph = Paragraph;
class Corpus extends Nonterminal {
    constructor(value) {
        super(value);
        this.value = value;
    }
    get literal() {
        return this.value.map(v => v.literal).join('');
    }
}
exports.Corpus = Corpus;
//# sourceMappingURL=nonterminal.js.map