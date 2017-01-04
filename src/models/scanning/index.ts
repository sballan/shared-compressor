export class Sym<T> {
	static separator: string = ''

	static parse(input) {
		return input.split(this.separator).map(s => new Sym(s));
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
		public value: string[] = key.split('')
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

	constructor(public input: string) { }
	
	scanAll() {
		this.corpus.value.forEach(p => {
			p.value.forEach(s => {
				s.value.forEach(w => {
					
				})
			})
		})
	}

	private scanCorpus(input = this.input) {
		return this.corpus = new Corpus(input);
	}

	private scanParagraph(input: string | Paragraph[] = this.corpus.value) {
		if (!Array.isArray(input)) {
			input = input.split.map(p=> new Paragraph(p))
		}
	}
	
	// scanCorpus() {
	// 	return this.corpus = new Corpus(this.input);
	// }

	scanParagraphs() : Map<string, Paragraph> {
		if (this.corpus.value.length > this.paragraphs.size) {
			this.corpus.value.forEach(p => {
				this.paragraphs.set(p.key, p);
			})
		}	

		return this.paragraphs;
	}

	scanSentances(): Map<string, Sentance>{
			this.paragraphs.forEach(p => {
				p.value.forEach(s => {
					this.sentances.set(s.key, s);
				})
			})

		return this.sentances;
	}

	scanWords() {
				
		})


		this.sentances.forEach(s => {
			s.map.forEach(w => {
				this.words.set(w.key, w);
			})
		})

		return this.words;
	}

	scan() {
		this.scanCorpus();
		this.scanParagraphs();
		this.scanSentances();
		this.scanWords();
	}






}