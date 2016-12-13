import { Word } from './word';
import { WordNode } from './word-node';
import { Node } from './node';

export class Dictionary extends WordNode {
	addWord(word: Word) : WordNode {
		return super.addNode(word) as WordNode;
	}

	addWords(words: Word[]) {
		super.addNodes(words);
	}

	has(word: Word) {
		return super.has(word);
	}

	get(word: Word) : WordNode {
		return this.map[word.value] as WordNode; 
	}

	remove(word: Word) {
		this.map[word.value] = undefined;
	}

	find(wordString: string) : WordNode {
		return this.map[wordString] as WordNode;
	}


}