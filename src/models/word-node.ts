import { Word } from './word';
import { Map } from '../utils/map';
import { Node } from './node'

export class WordNode extends Node<Word> {
	public word: Word
	public map: Map<WordNode> = {};
	public freq: number = 0;
	
  constructor(word: Word = new Word("")) {
    super(word.value, word)
	}

	addNode(word: Word, path?: string[]) : WordNode {
		return super._addNode(word.value, word, path) as WordNode;
	}

	addNodes(words: Word[]) {
		words.forEach(word => this.addNode(word));
	}

	getNode(path: string | string[]) : WordNode {
		return super._getNode(path) as WordNode;
	}

	has(word: Word): boolean {
		return super._has(word.value)
	}

	increment() {
		this.freq++;
	}


}
