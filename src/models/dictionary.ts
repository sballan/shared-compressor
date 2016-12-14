import { Word } from './word';
import { Map } from '../utils/map';
import { Node } from './node'

export class Dictionary extends Node<Word> {
	public map: Map<Node<Word>> = {};

	addWord(wordString: string | string[], path: string[] = []) {
		// if first argument is array, then we are adding a chain
		if (Array.isArray(wordString) && wordString.length > 1) {
			path = wordString;
			wordString = wordString.pop();
		} else {
			wordString = wordString[0]
			path = [];
		}

		let word = this.getWord(wordString) || new Word(wordString);
		super._addNode(word.value, word);
		if(path.length > 0) super._addNode(word.value, word, path);
	}

	getWord(wordString: string): Word {
		let node = this.map[wordString]
		return node ? node.value : undefined;
	}

	getWordNode(path: string | string[]) : Node<Word> {
		return super._getNode(path);
	}

	has(word: Word): boolean {
		return super._has(word.value)
	}

}
