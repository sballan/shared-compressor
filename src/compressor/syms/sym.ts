import { Key } from './key';
import { Value } from './value'


// A Sym is a unique key-value pair
export abstract class Sym {
	public key: symbol;
	public value: Value | Value[];

	constructor(value: Value) {
	
		if (Sym.dictionary.has(value)) {
				return Sym.dictionary.get(value);
		} else {
				Sym.dictionary.set(value, this)
		}
	}

	abstract get literal() : string

	static dictionary: Map<Value, Sym> = new Map();

	static build(value: Sym[]): string {
		return value.map(v => {
			return v.literal
		}).join('');
	}

}