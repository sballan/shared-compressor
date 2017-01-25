"use strict";
const token_1 = require('./token');
const terminal_1 = require('./terminal');
describe(`Token`, () => {
    it(`can be constructed with value: string argument, and a type Expr argument`, () => {
        const s = new terminal_1.Separator('-');
        const c = new terminal_1.Char('a');
        const token1 = new token_1.Token(s);
        const token2 = new token_1.Token(c);
        expect(token1).toBeDefined();
        expect(token2).toBeDefined();
    });
    it(`returns the existing token if a token with the same value is constructed`, () => {
        const s = new terminal_1.Separator('-');
        const c = new terminal_1.Char('a');
        const token1 = new token_1.Token(s);
        const token2 = new token_1.Token(c);
        const token3 = new token_1.Token(s);
        const token4 = new token_1.Token(c);
        expect(token1).toBe(token3);
        expect(token2).toBe(token4);
        // FIXME
        // expect(new Char(value2)).toThrow(new Error('Chars cannot be Chars'))
    });
    it(`has a static toLiteral method which returns the string value of a token`, () => {
        const s = new terminal_1.Separator('-');
        const c = new terminal_1.Char('a');
        const token1 = new token_1.Token(s);
        const token2 = new token_1.Token(c);
        expect(token_1.Token.toLiteral(token1)).toBe('-');
        expect(token_1.Token.toLiteral(token2)).toBe('a');
    });
    it(`has a static create method which returns a token for a given value`, () => {
        const s = token_1.Token.create('-', terminal_1.Separator);
        const c = token_1.Token.create('a', terminal_1.Char);
        expect(token_1.Token.toLiteral(s)).toBe('-');
        expect(token_1.Token.toLiteral(c)).toBe('a');
    });
});
//# sourceMappingURL=token.spec.js.map