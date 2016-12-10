import { Node } from './node';

export class Word {
	value: string;
	nodes: { [index: string]: Node } = {}
	id: string;


	constructor(value: string) {
		this.value = value;
		this.id = Math.random().toString();
	}

	addNode(word: Word) {
		if (this.has(word)) this.increment(word);
		else this.nodes[word.value] = new Node(word);
	}

	addNodes(words: Word[]) {
		words.forEach(word=> this.addNode(word))
	}

	has(word: Word, maxDepth: number = 0) {
		const key = word.value;
		if (this.nodes[key]) return true;
		if (maxDepth <= 0) return false;
		else return this.has(word, maxDepth - 1);
	}

	increment(word: Word) {
		this.nodes[word.value].increment();
	}


}