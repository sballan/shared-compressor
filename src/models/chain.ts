import { Word } from './word';
import { WordNode } from './word-node';
import { Dictionary } from './dictionary';

export class Chain {
	public dictionary = new Dictionary();
	public nodes: WordNode = new WordNode();


	addSingleWord(word: Word) {
		return this.dictionary.addWord(word);
	}

	getSingleWord(wordString: string) : Word {
		return this.dictionary.findWord(wordString)
	}
	
	addSingleLink(word: Word, path?: string[]) : WordNode {
		const wordNode = this.addSingleWord(word);
		return this.nodes.addNode(wordNode.word, path);
	}

	getSingleLink(path: string | string[]) : WordNode {
		return this.nodes.getNode(path);
	}


	print() {
		console.log(this.nodes[20]);
	}

}