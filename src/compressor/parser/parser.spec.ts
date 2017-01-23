import { Parser } from './parser';

import { Node } from './node';

describe(`Parser`, () => {
	const input = "Hey, my name is Sam.  What's up?";

	it(`can be constructed with an input: string argument`, () => {
		const parser = new Parser(input);
		expect(parser).toBeDefined();
	})

	it(`can scan input with scan()`, () => {
		const parser = new Parser(input);
		parser.run();
		console.log(parser.tokens);
	})




	
})