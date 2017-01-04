export class Sym<T> {
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
	constructor(
		public key: string,
		public value: string[] = key.split('')
	) {
		super(key, value);
	}

}

export class Sentance extends Sym<Word> {
	constructor(
		public key: string,
		public value: Word[] = key.split(' ').map(w => new Word(w))) {
		super(key, value);
	}

}

export class Paragraph extends Sym<Sentance> {
	constructor(
		public key: string,
		public value: Sentance[] = key.split('.').map(s => new Sentance(s))) {
		super(key, value);
	}
}

export class Corpus extends Sym<Paragraph> {
	constructor(
		public key: string,
		public value: Paragraph[] = key.split('\n').map(s => new Paragraph(s))) {
		super(key, value);
	}
}


export class Parser {
	public corpus: Corpus;
	public paragraphs: Map<string, Paragraph> = new Map();
	public sentances: Map<string, Sentance> = new Map();
	public words: Map<string, Word> = new Map();

	constructor(public input: string) {}

	scanCorpus() {
		return this.corpus = new Corpus(this.input);

	}

	scanParagraphs() : Map<string, Paragraph> {
		if (this.corpus.value.length > this.paragraphs.size) {
			this.corpus.value.forEach(p => {
				this.paragraphs.set(p.key, p);
			})
		}	

		return this.paragraphs;

	}

	scanSentances(): Map<string, Sentance>{
			this.scanParagraphs().forEach(p => {
				p.value.forEach(s => {
					this.sentances.set(s.key, s);
				})
			})

		return this.sentances;
			
	}

	scanWords() {
			this.scanSentances().forEach(s => {
				s.value.forEach(w => {
					this.words.set(w.key, w);
				})
			})

		return this.words;
	}

	scan() {
		this.scanCorpus();
		this.scanWords();
	}






}