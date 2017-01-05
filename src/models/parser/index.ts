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

export class Sentance extends Sym<Word> {
	static parse(input) {
		return input.split('.').map(s => new Sentance(s))
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

export class Corpus extends Sym<Paragraph> {

	constructor(
		public key: string,
		public value: Paragraph[] = Paragraph.parse(key)
	)
	{
		super(key, value);
	}
}


export class Parser {
	public corpus: Corpus;
	public paragraphs: Map<string, Paragraph> = new Map();
	public sentances: Map<string, Sentance> = new Map();
	public words: Map<string, Word> = new Map();

	private _paragraphs: Paragraph[]	
	private _sentances: Sentance[];
	private _words: Word[];

	constructor(public input: string) { 	}
	
	scanFromTop() {
		this.corpus = this.corpus || new Corpus(this.input);
		const paragraphs: Paragraph[] = this.scan(Paragraph, this.corpus.value)
		const sentances: Sentance[] = paragraphs.map(p => {
			return this.scan(Sentance, p.value);
		})
		const words: Word[] = sentances.map(s => {
			return this.scan(Word, s.value);
		})

	}


	private scan(type, input) {
		if (type === Corpus) return new Corpus(input);

		if (!Array.isArray(input)) {
			return type.parse(input);
		}

		return input;
	}

	private scanCorpus(input = this.input) {
		return new Corpus(input);
	}


}