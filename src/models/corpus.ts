import { Parse } from './parse';
import { Word } from './word';
import { Dictionary } from './dictionary';
import { Chain } from './chain';

export class Corpus {
	public chain: Chain = new Chain();
	public dictionary = new Dictionary();
	private text: string;
	private wordStrings: string[];

	constructor(text: string) {
		this.text = text;
	}

	parse() {
		this.wordStrings = Parse.words(this.text)
		this.wordStrings.forEach(w => {
			this.dictionary.addWord(w);
		})
	}

	makeMap(depth = 1) {
		const length = this.wordStrings.length;

		for (let i = 0; i < length; i++) {
			this.makeChain(this.wordStrings.slice(i, i+depth))
		}
	}

	makeChain(wordStrings: string[]) {
		const length = wordStrings.length

		for (let i = 0; i < length; i++) {
			const chain = this.wordStrings.slice(0, i + 1);
			this.dictionary.addWord(this.wordStrings.slice(0, i))
		}

	}

	
	print() {
		console.log(this.dictionary.map['\nWe']);
	}

}