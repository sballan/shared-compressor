import { Chain } from './chain';
import { Word } from './word';

export class Node {
	chain: Chain;
	words: Word[];
	freq: number;
	
	constructor(words: string[]) {
		if (!Array.isArray(words)) words = [words];

		this.words = Word.make(words);
	}

	addToChain(word: string) {
		this.chain.add(word)
	}
	
	get length() { return this.words.length; }
}