import { Word } from './word';
import { Dictionary } from './dictionary';

export class Corpus {
	public dictionary = new Dictionary();
	private words: Word[];
	private text: string;

	constructor(text: string) {
		this.text = text;
	}

	parse() {
		const arr = this.text.split(' ');
		this.words = this.dictionary.addWords(arr);
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