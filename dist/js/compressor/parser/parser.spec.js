"use strict";
const parser_1 = require('./parser');
describe(`Parser`, () => {
    const input = "Hey, my name is Sam.  What's up?";
    it(`can be constructed with an input: string argument`, () => {
        const parser = new parser_1.Parser(input);
        expect(parser).toBeDefined();
    });
    it(`can scan input with scan()`, () => {
        const parser = new parser_1.Parser(input);
        parser.run();
        console.log(parser.tokens);
    });
});
//# sourceMappingURL=parser.spec.js.map