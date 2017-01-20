import { Key } from './key';

// A Sym is a unique key-value pair
export abstract class Value {
	key: symbol;
	value: any

	abstract get literal() : string;
}