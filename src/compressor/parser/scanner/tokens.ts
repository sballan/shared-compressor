// A Sym is a uniqye key-value pair
export class Sym {
	public key: symbol;
	public value: any;

	constructor() {
			if (Sym.dictionary.has(this.key)) {
			return Sym.dictionary.get(this.key)
		} else {
			Sym.dictionary.set(this.key, this)
		}
	}

	static dictionary: WeakMap<symbol, Sym> = new WeakMap();
}

// A Terminal is a Sym with a string for it's value
export class Terminal extends Sym { public value: string; }

// A Nonterminal is a Sym with a Sym[] for it's value
export class Nonterminal extends Sym { public value: Sym[]; }

// Tokens are Syms with a value that is a Sym[] with no Tokens.  Tokens also have a cache, so they are printable;
export class Token extends Sym { 
	public cache: string;

	constructor(
		key: string,
		public value: Sym[]
	) { 
		super();
		this.key = Symbol.for(key);

		if (Token.dictionary.has(this.key)) {
			return Token.dictionary.get(this.key)
		} else {
			Token.dictionary.set(this.key, this)
		}

		this.build();

	}

	toString() { return this.build(); }

	purge() { this.cache = ""; };

	build(value: Sym[] = this.value) {
		if (this.cache) return this.cache;

		let finished: boolean = false;
		let newVals: Sym[] = [];

		while (!finished) {	
			finished = true;
			value.forEach(s => {
				if (s instanceof Token) {
					finished = true;
					throw new Error('Tokens cannot have tokens as values')
				} else if (s instanceof Nonterminal) {
					finished = false;
					newVals.push(...s.value)
				} else if (s instanceof Terminal) {
					newVals.push(s)
				}
			})
			value = newVals;
		}
		return this.cache = newVals.map(v=> v.value).join('')
	}

	static dictionary: WeakMap<symbol, Token> = new WeakMap();

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