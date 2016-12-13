import { Word } from './word';
import { WordNode } from './word-node';
import { Dictionary } from './dictionary';

export class Chain {
	public dictionary = new Dictionary();
	public nodes: WordNode = new WordNode();

	addLink(word: Word, path: string[]) {
		const wordNode = this.dictionary.addWord(word);
		this.nodes.addNode(wordNode.word, path);
	}

	addLinks(words: Word[]) {
		this.dictionary.addWords(words);
		this.nodes.addNodes(words);
	}

	print() {
		console.log(this.nodes[20]);
	}

}