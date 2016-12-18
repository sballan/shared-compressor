import { Word } from './word';
import { Map } from '../../utils';
import { Node } from '../node'

export class Dictionary extends Node<Word> {
	public map: Map<Node<Word>> = {};

    get nodes() {
        const nodeArray = [];
        for (let el in this.map) nodeArray.push(this.map[el]);
        return nodeArray
    }

	addNode(key: string, value: Word, path: string[] = []) : Node<Word> {
       const node = super.addNode(key, value);
       node.freq++;

       if(path.length > 0) super.addNode(key, value, path).freq++;

       return node;

    }

    addWord(wordString: string | string[], path: string[] = []) {
        // if first argument is array, then we are adding a chain
        if (Array.isArray(wordString) && wordString.length > 1) {
            path = wordString;
            wordString = wordString.pop();
        } else if(Array.isArray(wordString)) {
            wordString = wordString[0];
            path = [];
        }

        let word = this.getWord(wordString) || new Word(wordString);

        this.addNode(wordString, word, path);

    }

	getWord(wordString: string): Word {
		let node = this.map[wordString]
		return node ? node.value : undefined;
	}

	getWordNode(path: string | string[]) : Node<Word> {
		return super.getNode(path);
	}

	has(wordString: string): boolean {
		return super.has(wordString)
	}

	getMostFrequent(num: number) {
		const nodes = this.nodes;


	}

}
