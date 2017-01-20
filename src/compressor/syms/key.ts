import { Sym } from './sym';

export class Key {
	public symbol
	constructor(keyString: string) {
		this.symbol = Symbol.for(keyString);

		if (Key.dictionary.has(this.symbol)) {
			return Key.dictionary.get(this.symbol)
		}

		Key.dictionary.set(this.symbol, this);

	}

	toString() : string {
		return Symbol.keyFor(this.symbol);
	}

	static dictionary: Map<symbol, Key> = new Map();
}