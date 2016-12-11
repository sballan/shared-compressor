import { Word } from './word';
import { Map } from '../utils/map';

export class Node {
	word: Word
	map: Map<Node> = {};
	freq: number = 0;
	
	constructor(word: Word) {
		this.word = word;
	}

	private addWordToMap(word: Word) {
		if (this.has(word)) return word;
		else this.map[word.value] = new Node(word);
	}

	addNode(word: Word, level: number = 0) {
		if (level <= 0) this.addWordToMap(word);
		else this.addNode(word, level - 1)
	}

	addNodes(words: Word[]) {
		words.forEach(word => this.addNode(word));
	}

	has(word: Word) : boolean {
		return this.map[word.value] ? true : false;
	}

	increment() {
		this.freq++;
	}


}