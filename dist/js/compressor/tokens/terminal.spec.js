"use strict";
const terminal_1 = require('./terminal');
describe(`Separator`, () => {
    it(`can be constructed with a single value: string argument`, () => {
        const term = new terminal_1.Separator('-');
        expect(term).toBeDefined();
    });
    it(`cannot be constructed with a value: string that is a character`, () => {
        const value1 = '-';
        const value2 = 'a';
        const term1 = new terminal_1.Separator(value1);
        expect(term1).toBeDefined();
        // FIXME
        // expect(new Separator(value2)).toThrow(new Error('Separators cannot be Chars'))
    });
    it(`has a literal property which returns the value`, () => {
        const termString = '-';
        const term = new terminal_1.Separator(termString);
        expect(term.literal).toBe(termString);
    });
    it(`will return an existing Separator if you try to create a new terminal using a value that already is a terminal`, () => {
        const termString = '-';
        const term1 = new terminal_1.Separator(termString);
        const term2 = new terminal_1.Separator(termString);
        expect(term1).toEqual(term2);
    });
});
describe(`Char`, () => {
    it(`can be constructed with a single value: string argument`, () => {
        const term = new terminal_1.Char('a');
        expect(term).toBeDefined();
    });
    it(`cannot be constructed with a value: string that is a character`, () => {
        const value1 = 'a';
        const value2 = '-';
        const term1 = new terminal_1.Char(value1);
        expect(term1).toBeDefined();
        // FIXME
        // expect(new Char(value2)).toThrow(new Error('Chars cannot be Chars'))
    });
    it(`has a literal property which returns the value`, () => {
        const termString = 'a';
        const term = new terminal_1.Char(termString);
        expect(term.literal).toBe(termString);
    });
    it(`will return an existing Char if you try to create a new terminal using a value that already is a terminal`, () => {
        const termString = 'a';
        const term1 = new terminal_1.Char(termString);
        const term2 = new terminal_1.Char(termString);
        expect(term1).toEqual(term2);
    });
});
//# sourceMappingURL=terminal.spec.js.map