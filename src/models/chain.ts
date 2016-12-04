import { Node } from './node';

export class Chain {
	private nodes: any;

	addWord(word: string | string[]) {
		if (this.nodes[word]) {
			this.nodes[word].freq++;
		} else {
			this.nodes[word] = new Node(word);
		}
	}

	get(word: string) {
		return this.nodes[word];
	}
}