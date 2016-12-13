import { Word } from './word';
import { Map } from '../utils/map';
import { Node } from './node'

export class WordNode extends Node<Word> {
	public word: Word
	public map: Map<Node<Word>> = {};
	public freq: number = 0;
	
	constructor(word?: Word) {
		super(word.value, word)
	}

	addNode(word: Word, path?: string[]) {
		return super._addNode(word.value, word, path)
	}

	addNodes(words: Word[]) {
		words.forEach(word => this.addNode(word));
	}

	has(word: Word): boolean {
		return super._has(word.value)
	}

	increment() {
		this.freq++;
	}


}
