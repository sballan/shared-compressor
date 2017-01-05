import { Word, Dictionary } from '../dictionary';
import { Node } from '../node'

export class PhraseBook extends Node<Word[]> {
	constructor(
		public dictionary: Dictionary
	) {	super()	}

	private phraseToKey(phraseStrings: string[]) {
		return phraseStrings.join(' ');
	}

	addNode(key: string, value: Word[], path: string[] = []) : Node<Word[]> {
		const node = super.addNode(key, value);
		node.freq++;

		if(path.length > 0) super.addNode(key, value, path).freq++;

		return node;

	}

	// A path is always an array of key: string
	addPhrase(phraseStrings: string[], path: string[] = []) {
		// if (phraseStrings.length > 1 && !!phraseStrings[0][0]) {
		// 		path = phraseStrings;
		// 		phraseStrings = phraseStrings.pop();
		// } else if(Array.isArray(phraseStrings)) {
		// 		phraseStrings = phraseStrings[0];
		// 		path = [];
		// }

		const phraseKey = this.phraseToKey(phraseStrings);
		const phraseWords: Word[] = phraseStrings.map(p => {
			return this.dictionary.addWord(p).value
		})

		this.addNode(phraseKey, phraseWords, path);

	}

	getPhrase(phraseStrings: string[]): Word[] {
		const phraseKey = this.phraseToKey(phraseStrings);
		return this.map.get(phraseKey).value;
	}

	getPhraseNode(path: string | string[]): Node<Word[]> {	
		return super.getNode(path);
	}

	has(phraseKey: string): boolean {
		return super.has(phraseKey)
	}

	hasPath(path: string | string[]) : boolean {
		return !!super.getNode(path);
	}

	pathFrequency(path: string[]) : number {
		return this.getPhraseNode(path).freq;
	}

	getMostFrequent(num: number = 20) {
		return this.nodes.sort((a, b) : number => {
			return a.freq - b.freq;
		}).slice(0, num)


	}

}
