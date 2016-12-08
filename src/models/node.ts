import { Chain } from './chain';
import { Word } from './word';
import { Dictionary } from './dictionary';

export class Node {
	private _words: Word[];
	chain: Chain = new Chain();
	freq: number;
	
	constructor(words: Word | Word[]) {
		if (!Array.isArray(words)) words = [words];
		this._words = words
	}

	addToChain(word: Word) {
		this.chain.add(word)
	}

	get words() {
		const wordStrings = this._words.map(w => w.value)
		return wordStrings.join(' ');
	}

	get length() { return this.words.length; }
}