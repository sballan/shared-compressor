import { Word } from './word';

export class Corpus {
	private words: Word[];
	private value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse() {
		const arr = this.value.split(' ');
		this.words = Word.make(arr);
	}

	addWord(word: Word) {
		this.words.push(word);
	}

}