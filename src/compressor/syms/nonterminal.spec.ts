import { Terminal } from './terminal'
import { Nonterminal } from './nonterminal';

describe(`Terminal`, () => {
	it(`can be constructed with a single value: Terminal[] argument`, () => {
		const term1 = new Terminal('H');
		const term2 = new Terminal('i');
		const nonterm = new Nonterminal([term1, term2])

		expect(nonterm).toBeDefined()
	})

	it(`has a key property, which is the Symbol.for the literal property`, () => {
		const term1 = new Terminal('H');
		const term2 = new Terminal('i');
		const nonterm = new Nonterminal([term1, term2])

		expect(nonterm.literal).toBe('Hi');
		expect(nonterm.key).toBe(Symbol.for(nonterm.literal));
	})

	it(`will return an existing Terminal if you try to create a new terminal using a value that already is a terminal`, () => {
		const term1 = new Terminal('H');
		const term2 = new Terminal('i');
		const nonterm1 = new Nonterminal([term1, term2])
		const nonterm2 = new Nonterminal([term1, term2])

		expect(nonterm1).toBe(nonterm2)
	})
	
})