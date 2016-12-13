import { Word } from './word';
import { Dictionary } from './dictionary';
import { Chain } from './chain';

export class Corpus {
	public chain: Chain = new Chain();
	private text: string;

	constructor(text: string) {
		this.text = text;
	}

	parse() {
		const words = Word.parse(this.text)
		this.chain.addLinks(words);
	}

	makeMap(depth: number = 1) {
		const length = this.words.length;

		for (let i = 0; i < length; i++) {
			this.words[i].addNodes(this.words.slice(i, i+depth));

		}
	}

	print() {
		console.log(this.words[20]);
	}

}