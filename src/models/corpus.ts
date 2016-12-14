import { Parse } from './parse';
import { Word } from './word';
import { Dictionary } from './dictionary';
import { Chain } from './chain';

export class Corpus {
	public chain: Chain = new Chain();
	private text: string;
	private wordStrings: string[];

	constructor(text: string) {
		this.text = text;
	}

	parse() {
		this.wordStrings = Parse.words(this.text)
		// this.chain.addWords(this.wordStrings);
	}

	makeMap(depth = 1) {
		const length = this.wordStrings.length;

		for (let i = 0; i < length; i++) {
			this.chain.makeLinks(this.wordStrings.slice(i, i+depth))
		}
	}

	print() {
		console.log(this.chain.nodes.map['hold'].map['these']);
	}

}