import { Terminal } from './terminal'
import { Nonterminal } from './nonterminal';
import { Token } from './token'

describe(`Token`, () => {
	const term1 = new Terminal('H');
	const term2 = new Terminal('i');
	const nonterm1 = new Nonterminal([term1, term2])

	const term3 = new Terminal(' ');

	const term4 = new Terminal('M');
	const term5 = new Terminal('o');
	const term6 = new Terminal('m');
	
	const nonterm2 = new Nonterminal([term4, term5, term6])

	const term7 = new Terminal('!');

	it(`can be constructed with a key: symbol and value: Sym[] argument`, () => {
		const token = new Token([nonterm1, term3, nonterm2, term7])
		expect(token).toBeDefined()
	})

	it(`has a key property, which is the Symbol.for the literal property`, () => {
		const token = new Token([nonterm1, term3, nonterm2, term7])

		expect(token.key).toBe(Symbol.for('Hi Mom!'))
		expect(token.key).toBe(Symbol.for(token.literal))
	})

	it(`will return an existing Token if you try to create a new terminal using a value that already is a Token`, () => {
		const token1 = new Token([nonterm1, term3, nonterm2, term7])
		const token2 = new Token( [nonterm1, term3, nonterm2, term7])
		expect(token1).toBe(token2)
	})
	
})