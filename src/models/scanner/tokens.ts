export abstract class Token extends Symbol { 
	static dictionary: Map<symbol, symbol> = new Map();

	static scan(input, split: string = '') : symbol[] {
		return input.split(split).map(Symbol.for);
	}

	public key: symbol;

	constructor(
		key: string,
		public value: symbol[]
	) { 
		super();

		const keySymbol = Symbol.for(key);

		if (Token.dictionary.has(keySymbol)) {
			return Token.dictionary.get(keySymbol)
		} else {
			Token.dictionary.set(keySymbol, key)
		}
		
		this.key = keySymbol;

	}

	toString() {
		return this.value.map(v => {
			return Symbol.keyFor(v);
		})
	}


	getToken(key: string) : T {
		return this.get(Symbol.for(key));
	}

	get first() : T {
		return this.value[0];
	}

	get last() : T {
		return this.value[this.value.length - 1];
	}

}
	


export abstract class Token2 extends Map<symbol, symbol> { 
	static dictionary: Map<symbol, symbol> = new Map();

	static scan(input, split: string = '') : any[] {
		return input.split(split).map(Symbol.for);
	}

	public key: symbol;

	constructor(
		key: string,
		public value: symbol[]
	) { 
		super();

		const keySymbol = Symbol.for(key);

		if (Token.dictionary.has(keySymbol)) {
			return Token.dictionary.get(keySymbol)
		} else {
			Token.dictionary.set(keySymbol, keySymbol)
		}
		
		this.key = keySymbol;

	}

	toString() {
		return this.value.map(v => {
			return Symbol.keyFor(v);
		})
	}


	getToken(key: string) : T {
		return this.get(Symbol.for(key));
	}

	get first() : T {
		return this.value[0];
	}

	get last() : T {
		return this.value[this.value.length - 1];
	}

}
	

export class Char extends Token {
	constructor(
		key: string,
		public value: symbol[] = Token.scan(key)
	) {
		super(key, value);

		if (Char.dictionary.has(this.key)) {
			return Char.dictionary.get(this.key)
		} else {
			Char.dictionary.set(this.key, value)
		}

	}

	static dictionary: Map<symbol, symbol> = new Map();

	static scan(input): symbol[] {
		return super.scan(input)
	}

}

export class Word extends Token {
	constructor(
		key: string,
		public value: symbol[] = Token.scan(key)
	) {
		super(key, value);

		if (Word.dictionary.has(this.key)) {
			return Word.dictionary.get(this.key)
		} else {
			Word.dictionary.set(this.key, value)
		}

	}

	static dictionary: Map<symbol, symbol[]> = new Map();

	static scan(input, splitter: string = ' '): symbol[] {
		return input.split(splitter).map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Word(Symbol.keyFor(s)));
			}	
			return this.dictionary.get(s);
		})
	}

}

export class Phrase extends Token<Word> {
	static dictionary: Map<symbol, symbol> = new Map();

	static scan(input, splitter: string = '.'): Phrase[] {
		return input.split(splitter).map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Phrase(Symbol.keyFor(s)));
			}	
			return this.dictionary.get(s);
		})
	}

	constructor(
		key: string,
		public value: symbol[] = Word.scan(key)
	)
	{
		super(key, value);

		if (Phrase.dictionary.has(this.key)) {
			return Phrase.dictionary.get(this.key)
		} else {
			Phrase.dictionary.set(this.key, this)
		}
	}

}

/**
export class Sentance extends Phrase {
	static dictionary: Map<symbol, Sentance> = new Map();

	static parse(input) {
		const phrases = Phrase.scan(input);
		const lastPhrase = phrases.pop();

		const lastChar = lastPhrase.last.last;
		if (Symbol.for('.') !== lastChar.key) {
			console.error('Invalid input - expected Sentance, got Phrase.');
		} else {
			phrases.push(lastPhrase)
		}
		
		return phrases;

	}

	constructor(
		key: string,
		public value: Word[] = Word.scan(key)
	) {

		super(key, value);
		if (key[key.length - 1] !== '.') {
			throw Error('Invalid argument; expected Sentance, got a Phrase.');
		}

		if (Sentance.dictionary.has(this.key)) {
			return Sentance.dictionary.get(this.key)
		} else {
			Sentance.dictionary.set(this.key, this)
		}

	}

}
*/



export class Paragraph extends Token{
	static dictionary: Map<symbol, symbol> = new Map();
	
	static scan(input): smybol[] {
		return input.split('.\n\n').map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Paragraph(Symbol.keyFor(s)));
			}	
			return this.dictionary.get(s);
		})
	}

	constructor(
		key: string,
		public value: Phrase[] = Phrase.scan(key)
	)
	{
		super(key, value);

		if (Paragraph.dictionary.has(this.key)) {
			return Paragraph.dictionary.get(this.key)
		} else {
			Paragraph.dictionary.set(this.key, this)
		}
	}
}

export class Corpus extends Token {

	constructor(
		key: string,
		public value: symbol[] = Paragraph.scan(key)
	)
	{
		super(key, value);
	}
}