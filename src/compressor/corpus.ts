import { Parse } from './parse';
import { Dictionary } from './dictionary/dictionary';

export class Corpus {
	public dictionary = new Dictionary();
	private text: string;
	private wordStrings: string[];

	constructor(text: string) {
		this.text = text;
	}

	parse() {
		this.wordStrings = Parse.words(this.text)
		// this.wordStrings.forEach(w => {
		// 	this.dictionary.addWord(w);
		// })
	}

	makeMap(depth = 1) {
		const length = this.wordStrings.length;

		for (let i = 0; i < length; i++) {
			const dictionary = this.makeChain(this.wordStrings.slice(i, i + depth))
			if(i%1000 === 0) console.log(dictionary)
		}
	}

	makeChain(wordStrings: string[]) {
		const length = wordStrings.length

		for (let i = 0; i < length; i++) {
			const chain = wordStrings.slice(0, i + 1);
			this.dictionary.addWord(chain)
		}
		return this.dictionary
	}

	
	print() {
		console.log(this.dictionary.map);
	}

}