export class Sym<T> extends Map<Symbol, Sym<T>> {
	static dictionary = new Map();

	static scan(input, splitter: string = '') : any[] {
		return input.split(splitter).map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Sym(Symbol.keyFor(s), s));
			}	
			return this.dictionary.get(s);
		})
	}

	public key: Symbol;

	constructor(
		key: string,
		public value: Sym<T>[] = Sym.scan(key)
	) { 
		super();

		const keySymbol = Symbol.for(key);

		if (Sym.dictionary.has(keySymbol)) {
			return Sym.dictionary.get(keySymbol)
		}

		this.key = keySymbol;

		this.remap();

	}

	protected remap() {
		

		this.value.forEach(s => {
			this.set(s.key, s);
		})
	}
}

export class Word extends Sym<Word> {
	static dictionary = new Map();

	static scan(input, splitter: string = ' '): Sym<string>[] {
		return input.split(splitter).map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Word(Symbol.keyFor(s)));
			}	
			return this.dictionary.get(s);
		})
	}

	constructor(
		key: string,
		public value: Sym<Symbol>[] = Sym.scan(key)
	) {
		super(key, value);
		Word.dictionary.set(this.key, this);
	}

}

export class Phrase extends Sym<Phrase> {
	static dictionary = new Map();

	static scan(input, splitter: string = '.'): Sym<Phrase>[] {
		return input.split(splitter).map(Symbol.for).map(s=> {
			if (!this.dictionary.has(s)) {
				this.dictionary.set(s, new Phrase(Symbol.keyFor(s)));
			}	
			return this.dictionary.get(s);
		})
	}

	constructor(
		key: string,
		public value: Sym<Word>[] = Word.scan(key)
	)
	{
		super(key, value);
		Phrase.dictionary.set(this.key, this);
	}

}


export class Sentance extends Phrase {
	static parse(input) {
		const last = Phrase.scan(input);

	}

	constructor(
		key: string,
		public value: Word[] = Word.scan(key)
	) {

		super(key, value);
		if (key[key.length - 1] !== '.') {
			throw Error('Invalid argument; expected Sentance, got a Phrase.');
		}

		Phrase.dictionary.set(this.key, this);
		Sentance.dictionary.set(this.key, this);
	}

}



export class Paragraph extends Sym<Paragraph> {
	static parse(input) : Paragraph[] {
		return input.split('.\n\n').map(s => new Paragraph(s))
	}

	constructor(
		public key: string,
		public value: Sentance[] = Sentance.parse(key)
	)
	{
		super(key, value);
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