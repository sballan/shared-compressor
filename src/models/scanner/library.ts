export class Sym<T> {
	static parse(input) {
		return input.split('').map(s => new Sym(s));
	}

	public map: Map<string, T> = new Map();

	constructor(
		public key: string,
		public value: any[] = []
	) { 
		this.remap();
	}

	protected remap() {
		this.value.forEach(w => {
			this.map.set(w.key , w);
		})
	}

}

export class Word extends Sym<string> {
	static parse(input) {
		return input.split(' ').map(s => new Word(s))
	}

	constructor(
		public key: string,
		public value: string[] = Sym.parse(key)
	) {
		super(key, value);
	}

}

export class Phrase extends Sym<Word> {
	static parse(input) {
		input = input.split('.').map(s => new Sentance(s));
		return input.length === 1 ? input : new Error("Invalid input, got Phrase should be Sentance")
		
	}

	constructor(
		public key: string,
		public value: Word[] = Word.parse(key)
	)
	{
		super(key, value);
	}

}


export class Sentance extends Phrase {
	static parse(input) {
		return Word.parse(input);
	}

	constructor(
		public key: string,
		public value: Word[] = Word.parse(key)
	)
	{
		super(key, value);
	}

}



export class Paragraph extends Sym<Sentance> {
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