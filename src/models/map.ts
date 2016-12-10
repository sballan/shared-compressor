import { Word } from './word';

export class WordMap {
	private words: { [index: string]: Word }

	add(word: Word) {
		const key = word.value;
		if (!this.words[key]) return this.words[key] = word;
		else	return this.words[key]
	}

	has(word: Word) : boolean {
		return this.words[word.value] ? true : false;
	}


}