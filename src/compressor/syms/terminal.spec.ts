import { Terminal } from './Terminal';

describe(`Terminal`, () => {
	it(`can be constructed with a single value argument`, () => {
		const term = new Terminal('Term');
		expect(term).toBeDefined()
	})

	it(`has a key property, which is the Symbol.for the value property`, () => {
		const termString = 'A';
		const term = new Terminal(termString);

		expect(term.value).toBe(Symbol.keyFor(term.key))
		expect(term.key).toBe(Symbol.for(term.value))
	})

	it(`has a literal property which returns the value`, () => {
		const termString = 'A';
		const term = new Terminal(termString);

		expect(term.literal).toBe(termString)
	})

	it(`will return an existing Terminal if you try to create a new terminal using a value that already is a terminal`, () => {
		const termString = 'A';
		const term1 = new Terminal(termString);
		const term2 = new Terminal(termString);

		expect(term1).toBe(term2)
	})

	it(`has static method create(), which returns a new Terminal`, () => {
		const termString = 'A';
		const term1 = Terminal.create(termString);
		const term2 = Terminal.create(termString);

		expect(term1).toBe(term2)
	})
	
})