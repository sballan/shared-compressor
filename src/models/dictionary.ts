import { Word } from './word';
import { WordNode } from './word-node';
import { Node } from './node';

export class Dictionary extends WordNode {
	addWord(word: Word) : WordNode {
		return super.addNode(word) as WordNode;
	}

	addWords(words: Word[]) : void {
		super.addNodes(words);
	}

	has(word: Word) {
		return super.has(word);
	}

	getWord(word: Word) : Word {
		return this.map[word.value].word; 
	}

	getWordNode(word: Word) : WordNode {
		return this.map[word.value]; 
	}

	remove(word: Word) {
		this.map[word.value] = undefined;
	}

	findWord(wordString: string) : Word {
		return this.map[wordString].word;
	}

	findWordNode(wordString: string) : WordNode {
		return this.map[wordString];
	}


}