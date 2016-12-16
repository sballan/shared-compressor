import { Map } from '../../utils/map';
import { Node } from '../node/node'
import { Word } from './word';
import { Dictionary } from '../dictionary';

export class Chain extends Node<Dictionary> {
	public map: Map<Node<Dictionary>> = {};

	addWord(wordString: string | string[], path: string[] = []) {
		// if first argument is array, then we are adding a chain
		if (Array.isArray(wordString) && wordString.length > 1) {
			path = wordString;
			wordString = wordString.pop();
		} else if(Array.isArray(wordString)) {
			wordString = wordString[0]
			path = [];
		}

		let word = super.getWord(wordString) || new Word(wordString);
		super._addNode(word.value, word);
		if(path.length > 0) super._addNode(word.value, word, path);
	}



}
