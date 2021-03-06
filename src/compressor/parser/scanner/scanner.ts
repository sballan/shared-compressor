import { Corpus, Paragraph, Sentance, Token, Word } from './tokens';

export class Scanner {
	public corpus: Corpus;
	public paragraphs: Map<string, Paragraph> = new Map();
	public sentances: Map<string, Sentance> = new Map();
	public words: Map<string, Word> = new Map();

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

	scanCorpus(input = this.input) {
		return new Corpus(input);
	}

	scanTokens(input = this.input) {
		return Token.scan(input);
	}


}