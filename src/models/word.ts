import { Chain } from './chain';

export class Word {
	value: string;
	chain: Chain;
	id: string;


	constructor(value: string) {
		if (Word.allWords[value]) return Word.allWords[value];
		
		this.value = value;
		this.id = Math.random().toString();
	}

	static allWords: any;

	static make(words: string[]) {
		return words.map(word => {
			return this.allWords[word]
				? this.allWords[word] 
				: new Word(word);
		})
	}
}