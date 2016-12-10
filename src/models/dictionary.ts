import { WordMap } from './word-map';
import { Word } from './word';

export class Dictionary {
	words: {[index: string]: Word} = {}

	addWord(wordString: string) {
		if (!this.words[wordString]) {
			return this.words[wordString] = new Word(wordString);
		} else {
			return this.words[wordString]
		}
	}

	addWords(wordStrings: string[]) {
		return wordStrings.map(wordString => {
			if (!this.words[wordString]) {
				return this.words[wordString] = new Word(wordString)
			}
			return this.words[wordString];
		})
	}

}