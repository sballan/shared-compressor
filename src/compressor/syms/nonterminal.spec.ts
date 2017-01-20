import { Terminal, Nonterminal } from './expr'

describe(`Nonterminal`, () => {
	it(`can be constructed with a single value: Terminal[] argument`, () => {
		const term1 = new Terminal('H');
		const term2 = new Terminal('i');
		const nonterm = new Nonterminal([term1, term2])


		expect(nonterm).toBeDefined()
	})

	it(`has a key property, which is a random symbol`, () => {
		const term1 = new Terminal('H');
		const term2 = new Terminal('i');
		const nonterm = new Nonterminal([term1, term2])

		expect(typeof nonterm.key).toBe('symbol');
	})

	it(`will return an existing Nonterminal if you try to create a new nonterminal using a value that already is a nonterminal`, () => {
		const term1 = new Terminal('H');
		const term2 = new Terminal('i');
		const nonterm1 = new Nonterminal([term1, term2])
		const nonterm2 = new Nonterminal([term1, term2])

		expect([term1, term2]).toEqual([term1, term2])
		expect(nonterm1).toEqual(nonterm2)
	})
	
})