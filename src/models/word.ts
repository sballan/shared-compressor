import { Chain } from './chain';
import { Dictionary } from './dictionary';

export class Word {
	value: string;
	chain: Chain = new Chain();
	id: string;


	constructor(value: string) {
		this.value = value;
		this.id = Math.random().toString();
	}

	addNode(word: Word) {
		this.chain.add(word);
	}

}