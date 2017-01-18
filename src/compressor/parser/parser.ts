import { Dictionary } from './dictionary';
import { Corpus, Scanner, Word, Token } from './.'
import { WordNode } from './word-node';

export class Parser {
	// public corpus: Corpus
	public dictionary: WordNode = new WordNode();

	constructor(
		public input: string,
		public scanner: Scanner = new Scanner(input),
		public corpus: Corpus = scanner.scanCorpus(input)
	) {	}

	scan() {
		this.corpus.build();
	}

	parse() {
		// cache has been reverse, so we pop
		let expr: Token[] = this.corpus.cache;
		let finished = false;
		let index = expr.length + 1;

		while (!finished) {
			let childArr = [];

			let t = expr[index--];
			this.dictionary.addNode(Symbol.keyFor(t.key), t);


			if (!t.cache) finished = true;
			else {
				childArr.push(...t.cache);
				index += t.cache.length;
			}

			expr.push(...childArr);
			expr.forEach(t => {
				if (!t.cache) finished = false;
			})

		}
	}
}