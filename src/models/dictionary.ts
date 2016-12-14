import { Word } from './word';
import { WordNode } from './word-node';
import { Node } from './node';

export class Dictionary extends WordNode {
	addWord(wordString: string): WordNode {
		const word = new Word(wordString);
		const wordNode: WordNode = super.addNode(word);
		return wordNode;
	}

	addWords(wordStrings: string[]): WordNode[] {
		return wordStrings.map(w => this.addWord(w));
	}

	has(word: Word) {
		return super.has(word);
	}

	getWord(wordString: string) : Word {
		return this.map[wordString].word; 
	}

	getWordNode(wordString: string) : WordNode {
		return this.map[wordString]; 
	}

	remove(wordString: string) {
		this.map[wordString] = undefined;
	}

	findWord(wordString: string) : Word {
		return this.map[wordString].word;
	}

	findWordNode(wordString: string) : WordNode {
		return this.map[wordString];
	}


}