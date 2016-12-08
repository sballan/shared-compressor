import { Word } from './word';
import { Node } from './node';

export class Chain {
	private nodes: { [index: string]: Node } = {};

	add(word: Word) {
		if (!word) return;
		if (this.nodes[word.value]) {
			this.nodes[word.value].freq++;
		} else {
			this.nodes[word.value] = new Node(word);
		}
	}

	get(word: string) {
		return this.nodes[word];
	}
}