export class Sym {
	public key: symbol;
	public value: any;
}

export class Terminal extends Sym {
	public key: symbol;
	public value: string;
}

export class Nonterminal extends Sym {
	public key: symbol;
	public value: Sym[];
}

export class Token { 
	public key: symbol;
	public cache: Token[];

	constructor(
		key: string,
		public value: Sym[]
	) { 
		const keySymbol = Symbol.for(key);
		this.key = keySymbol;

		if (Token.dictionary.has(this.key)) {
			return Token.dictionary.get(this.key)
		} else {
			Token.dictionary.set(this.key, this)
		}

		this.build();

	}

	purge() {
		this.cache.forEach(t => t.purge());
		this.cache = [];
	}

	build() {
		if (this.cache.length === 0) {	
			this.value.forEach(s => {
				let t = Token.dictionary.get(s);
				this.cache.push(t);
				t.build();
			})
		}
		this.cache.reverse();
	}

	protected get splitChar() {
		return Token.splitter;
	}

	toString() {
		return this.value.map(v => {
			return Symbol.keyFor(v);
		}).join(this.splitChar)
	}

	static dictionary: Map<symbol, Token> = new Map();
	static splitter: string = '';

	static scan(input, split: string = this.splitter) : symbol[] {
		return input.split(split).map(Symbol.for);
	}
}
	

export class Word extends Token {
	constructor(
		key: string,
		public value: symbol[] = Token.scan(key, Token.splitter)
	) {
		super(key, value);
	}

	protected get splitChar() {
		return Word.splitter;
	}

	static splitter: string = ' ';
	
}

export class Phrase extends Token {
	constructor(
		key: string,
		public value: symbol[] = Token.scan(key, ' ')
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