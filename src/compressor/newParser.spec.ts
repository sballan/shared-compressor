import {
	Expr, Token,
	Terminal, Separator, Char,
	Nonterminal, Word, Clause, Sentence, Paragraph, Corpus
} from './newParser';

describe(`Separator`, () => {

	it(`can be constructed with a single value: string argument`, () => {
		const term = new Separator('-');
		expect(term).toBeDefined()
	})

	it(`cannot be constructed with a value: string that is a character`, () => {
		const value1 = '-';
		const value2 = 'a';
		const term1 = new Separator(value1);
		
		expect(term1).toBeDefined()
		// FIXME
		// expect(new Separator(value2)).toThrow(new Error('Separators cannot be Chars'))
	})

	it(`has a literal property which returns the value`, () => {
		const termString = '-';
		const term = new Separator(termString);

		expect(term.literal).toBe(termString)
	})

	it(`will return an existing Separator if you try to create a new terminal using a value that already is a terminal`, () => {
		const termString = '-';
		const term1 = new Separator(termString);
		const term2 = new Separator(termString);

		expect(term1).toEqual(term2)
	})

})

describe(`Char`, () => {

	it(`can be constructed with a single value: string argument`, () => {
		const term = new Char('a');
		expect(term).toBeDefined()
	})

	it(`cannot be constructed with a value: string that is a character`, () => {
		const value1 = 'a';
		const value2 = '-';
		const term1 = new Char(value1);
		
		expect(term1).toBeDefined()
		// FIXME
		// expect(new Char(value2)).toThrow(new Error('Chars cannot be Chars'))
	})

	it(`has a literal property which returns the value`, () => {
		const termString = 'a';
		const term = new Char(termString);

		expect(term.literal).toBe(termString)
	})

	it(`will return an existing Char if you try to create a new terminal using a value that already is a terminal`, () => {
		const termString = 'a';
		const term1 = new Char(termString);
		const term2 = new Char(termString);

		expect(term1).toEqual(term2)
	})

})

describe(`Token`, () => {

	it(`can be constructed with value: string argument, and a type Expr argument`, () => {
		const s = new Separator('-')
		const c = new Char('a')
		const token1 = new Token<Separator>(s);
		const token2 = new Token<Char>(c);

		expect(token1).toBeDefined()
		expect(token2).toBeDefined()
	})

	it(`returns the existing token if a token with the same value is constructed`, () => {
		const s = new Separator('-')
		const c = new Char('a')
		const token1 = new Token<Separator>(s);
		const token2 = new Token<Char>(c);
		const token3 = new Token<Separator>(s);
		const token4 = new Token<Char>(c);
		
		expect(token1).toBe(token3)
		expect(token2).toBe(token4)
		// FIXME
		// expect(new Char(value2)).toThrow(new Error('Chars cannot be Chars'))
	})

	it(`has a static toLiteral method which returns the string value of a token`, () => {
		const s = new Separator('-')
		const c = new Char('a')
		const token1 = new Token<Separator>(s);
		const token2 = new Token<Char>(c);
		
		expect(Token.toLiteral(token1)).toBe('-')
		expect(Token.toLiteral(token2)).toBe('a')
	})

	it(`has a static create method which returns a token for a given value`, () => {
		const s = Token.create<Separator>('-', Separator)
		const c = Token.create<Char>('a', Char)
		
		expect(Token.toLiteral(s)).toBe('-')
		expect(Token.toLiteral(c)).toBe('a')
	})


})

describe(`Word`, () => {

	it(`can be constructed with value: : Array<Token<Char>> argument`, () => {
		const token = Token.create<Char>(['h', 'e', 'y'], Char)	
		const word = new Word(token);

		expect(word).toBeDefined()
	})

	it(`returns the existing token if a token with the same value is constructed`, () => {
		const s = new Separator('-')
		const c = new Char('a')
		const token1 = new Token<Separator>(s);
		const token2 = new Token<Char>(c);
		const token3 = new Token<Separator>(s);
		const token4 = new Token<Char>(c);
		
		expect(token1).toBe(token3)
		expect(token2).toBe(token4)
		// FIXME
		// expect(new Char(value2)).toThrow(new Error('Chars cannot be Chars'))
	})

	it(`has a static toLiteral method which returns the string value of a token`, () => {
		const s = new Separator('-')
		const c = new Char('a')
		const token1 = new Token<Separator>(s);
		const token2 = new Token<Char>(c);
		
		expect(Token.toLiteral(token1)).toBe('-')
		expect(Token.toLiteral(token2)).toBe('a')
	})

	it(`has a static create method which returns a token for a given value`, () => {
		const s = Token.create<Separator>('-', Separator)
		const c = Token.create<Char>('a', Char)
		
		expect(Token.toLiteral(s)).toBe('-')
		expect(Token.toLiteral(c)).toBe('a')
	})


})

