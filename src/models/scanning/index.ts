export class Sym<T> {
	public map: Map<string, T>;

	constructor(
		public key: string,
		public value?: any
	) { 
		this.remap();
	}

	protected remap() {
		this.value.forEach(w => {
			this.map[w.key] = w;
		})
	}

}

export class Word extends Sym<string> {
	public readonly map: Map<string, string>;

	constructor(
		public key: string,
		public value?: string[]
	) {
		super(key, value);
	}

}

export class Sentance extends Sym<Word> {
	public readonly map: Map<string, Word>;

	constructor(public key: string, public value?: Word[]){
		super(key, key.split(' ').map(w => new Word(w)));
	}

}

export class Paragraph extends Sym<Sentance> {
	public readonly map: Map<string, Sentance>;

	constructor(public key: string, public value?: Sentance[]){
		super(key, key.split('.').map(s => new Sentance(s)));
	}
}

export class Corpus extends Sym<Paragraph> {
	public readonly map: Map<string, Paragraph>;

	constructor(public key: string, public value?: Paragraph[]){
		super(key, key.split('\n').map(s => new Paragraph(s)));
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