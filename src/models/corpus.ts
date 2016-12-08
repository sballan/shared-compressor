import { Word } from './word';
import { Dictionary } from './dictionary';

export class Corpus {
	private words: Word[];
	private value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse() {
		const arr = this.value.split(' ');
		this.words = Dictionary.addWords(arr);
	}

	addWord(word: Word) {
		this.words.push(word);
	}

	makeChains() {
		const length = this.words.length;

		for (let i = 0; i < length; i++) {
			this.words[i].addNode(this.words[i + 1]);
		}
	}

	print() {
		console.log(this.words[74].chain);
	}

}