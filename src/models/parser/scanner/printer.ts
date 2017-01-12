import { Corpus, Paragraph, Sentance, Word } from './tokens';

export class Printer {
	private output;
	
	constructor(
		public corpus: Corpus
	) { }
	
	printCorpus() {

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


}