export abstract class Token<T> extends Map<symbol, T> {
	static dictionary: Map<symbol, Token<any>> = new Map();

	static scan(input) : any[] {
		return input.split('').map(Symbol.for);
	}

	public key: symbol;

	constructor(
		key: string,
		public value: T[]
	) { 
		super();

		const keySymbol = Symbol.for(key);

		if (Token.dictionary.has(keySymbol)) {
			return Token.dictionary.get(keySymbol)
		} else {
			Token.dictionary.set(keySymbol, this)
		}
		
		this.key = keySymbol;

	}

	get last() : T {
		return this.value[this.value.length - 1];
	}

}

export class Word extends Token<symbol> {
	static dictionary: Map<symbol, Word> = new Map();

	static scan(input, splitter: string = ' '): Word[] {
		return input.split(splitter).map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Word(Symbol.keyFor(s)));
			}	
			return this.dictionary.get(s);
		})
	}

	constructor(
		key: string,
		public value: symbol[] = Token.scan(key)
	) {
		super(key, value);

		if (Word.dictionary.has(this.key)) {
			return Word.dictionary.get(this.key)
		} else {
			Word.dictionary.set(this.key, this)
		}

	}

}

export class Phrase extends Token<Word> {
	static dictionary: Map<symbol, Phrase> = new Map();

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
		public value: Word[] = Word.scan(key)
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


export class Sentance extends Phrase {
	static dictionary: Map<symbol, Sentance> = new Map();

	static parse(input) {
		const phrases = Phrase.scan(input);
		const lastPhrase = phrases.pop();

		const lastChar = lastPhrase.last.last;
		if (Symbol.for('.') !== lastChar) {
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



export class Paragraph extends Token<Sentance> {
	static dictionary: Map<symbol, Paragraph> = new Map();
	
	static parse(input) : Paragraph[] {
		return input.split('.\n\n').map(s => new Paragraph(s))
	}

	constructor(
		key: string,
		public value: Sentance[] = Sentance.parse(key)
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

export class Exerpt extends Paragraph {
	static parse(input) : Paragraph[] {
		return Sentance.parse(input);
	}

	constructor(
		public key: string,
		public value: Phrase[] = Phrase.parse(key)
	)
	{
		super(key, value);
	}
}


export class Corpus extends Sym<Exerpt> {

	constructor(
		public key: string,
		public value: Exerpt[] = Exerpt.parse(key)
	)
	{
		super(key, value);
	}
}