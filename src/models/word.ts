import { Node } from './node';
import { Map } from '../utils/map';
import { Parse } from './parse';

export class Word {
	value: string;
	id: string;

	constructor(value: string) {
		this.value = value;
		this.id = Math.random().toString();
	}

	static parse(wordString: string) : Word[] {
		const parsedWords = Parse.words(wordString);

		if (parsedWords.length === 1) {
			return [new Word(parsedWords[0])];
		} else {
			return parsedWords.map(w => new Word(w));
		}

	}


}