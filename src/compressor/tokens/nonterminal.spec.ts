import { Separator, Char } from './terminal';
import { Nonterminal, Word, Clause } from './nonterminal';
import { Token } from './token';

describe(`Word`, () => {

	it(`can be constructed with value: : Array<Token<Char>> argument`, () => {
		const token = Token.createMany<Char>(['h', 'e', 'y'], Char)	
		const word = new Word(token);

		expect(word).toBeDefined()
	})

	it(`returns the existing token if a token with the same value is constructed`, () => {
		const token = Token.createMany<Char>(['h', 'e', 'y'], Char)	
		const word1 = new Word(token);
		const word2 = new Word(token);
		
		expect(word1).toBe(word1)
	})

	it(`has a toLiteral method which returns the string value of the Word`, () => {
		const token = Token.createMany<Char>(['h', 'e', 'y'], Char)	
		const word1 = new Word(token);
		
		expect(word1.literal).toBe('hey')
	})

	it(`has a static create method which returns a token for a given value`, () => {
		const s = Token.create<Separator>('-', Separator)
		const c = Token.create<Char>('a', Char)
		
		expect(Token.toLiteral(s)).toBe('-')
		expect(Token.toLiteral(c)).toBe('a')
	})


})

describe(`Clause`, () => {
	const token1 = Token.createMany<Char>(['h', 'e', 'y'], Char)
	const token2 = Token.create<Word>(token1, Word);
	const token3 = Token.create<Separator>(' ', Separator)
	const token4 = Token.createMany<Char>(['y', 'o', 'u'], Char)
	const token5 = Token.create<Word>(token4, Word)
	
	it(`can be constructed with value: Array<Token<Word | Separator>>argument`, () => {
		const clause1 = new Clause([token2, token3, token5]);
		console.log("CLAUSE1 ", clause1)
		expect(clause1).toBeDefined()
	})

	it(`returns the existing token if a token with the same value is constructed`, () => {
		const token = Token.createMany<Char>(['h', 'e', 'y'], Char)	
		const word1 = new Word(token);
		const word2 = new Word(token);
		
		expect(word1).toBe(word1)
	})

	it(`has a toLiteral method which returns the string value of the Word`, () => {
		const token = Token.createMany<Char>(['h', 'e', 'y'], Char)	
		const word1 = new Word(token);
		
		expect(word1.literal).toBe('hey')
	})


})

