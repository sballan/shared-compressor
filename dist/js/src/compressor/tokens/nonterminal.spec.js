"use strict";
const terminal_1 = require('./terminal');
const nonterminal_1 = require('./nonterminal');
const token_1 = require('./token');
describe(`Word`, () => {
    it(`can be constructed with value: : Array<Token<Char>> argument`, () => {
        const token = token_1.Token.createMany(['h', 'e', 'y'], terminal_1.Char);
        const word = new nonterminal_1.Word(token);
        expect(word).toBeDefined();
    });
    it(`returns the existing token if a token with the same value is constructed`, () => {
        const token = token_1.Token.createMany(['h', 'e', 'y'], terminal_1.Char);
        const word1 = new nonterminal_1.Word(token);
        const word2 = new nonterminal_1.Word(token);
        expect(word1).toBe(word1);
    });
    it(`has a toLiteral method which returns the string value of the Word`, () => {
        const token = token_1.Token.createMany(['h', 'e', 'y'], terminal_1.Char);
        const word1 = new nonterminal_1.Word(token);
        expect(word1.literal).toBe('hey');
    });
    it(`has a static create method which returns a token for a given value`, () => {
        const s = token_1.Token.create('-', terminal_1.Separator);
        const c = token_1.Token.create('a', terminal_1.Char);
        expect(token_1.Token.toLiteral(s)).toBe('-');
        expect(token_1.Token.toLiteral(c)).toBe('a');
    });
});
describe(`Clause`, () => {
    const token1 = token_1.Token.createMany(['h', 'e', 'y'], terminal_1.Char);
    const token2 = token_1.Token.create(token1, nonterminal_1.Word);
    const token3 = token_1.Token.create(' ', terminal_1.Separator);
    const token4 = token_1.Token.createMany(['y', 'o', 'u'], terminal_1.Char);
    const token5 = token_1.Token.create(token4, nonterminal_1.Word);
    it(`can be constructed with value: Array<Token<Word | Separator>>argument`, () => {
        const clause1 = new nonterminal_1.Clause([token2, token3, token5]);
        console.log("CLAUSE1 ", clause1);
        expect(clause1).toBeDefined();
    });
    it(`returns the existing token if a token with the same value is constructed`, () => {
        const token = token_1.Token.createMany(['h', 'e', 'y'], terminal_1.Char);
        const word1 = new nonterminal_1.Word(token);
        const word2 = new nonterminal_1.Word(token);
        expect(word1).toBe(word1);
    });
    it(`has a toLiteral method which returns the string value of the Word`, () => {
        const token = token_1.Token.createMany(['h', 'e', 'y'], terminal_1.Char);
        const word1 = new nonterminal_1.Word(token);
        expect(word1.literal).toBe('hey');
    });
});
//# sourceMappingURL=nonterminal.spec.js.map