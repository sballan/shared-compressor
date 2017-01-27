import { Token } from './token';
import { Char, Separator } from './terminal';
import { Word } from './nonterminal';
import { Tokenizable} from './token';

export function isChar(value: string): boolean {
	return value.match(/[A-Za-z0-9]/) !== null;
}

export abstract class Expr implements Tokenizable {
	literal: string;
	type: string = "expr";
	
	constructor(public value: string | Array<Expr>) {	}
	
	abstract tokenize(): string
	abstract get tokenKeys() : string[]

	get key() { return this.tokenize()}

	toString() { return this.literal }

	static create<T>(value, constructor) : T {
		return new constructor(value);
	}

}