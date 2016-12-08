import { Chain } from './chain';
import { Word } from './word';

export class Dictionary {
	static words: {[index: string]: Word} = {}

	static addWord(word: string) {
		if (!this.words[word]) {
			return this.words[word] = new Word(word);
		} else {
			return this.words[word]
		}
	}

	static addWords(words: string[]) {
		return words.map(word => {
			if (!this.words[word]) {
				return this.words[word] = new Word(word)
			}
			return this.words[word];
		})
	}

}