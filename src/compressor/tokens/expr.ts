import { Token } from './token';
import { Char, Separator } from './terminal';
import { Word } from './nonterminal';

export function isChar(value: string): boolean {
	return value.match(/[A-Za-z0-9]/) !== null;
}

export interface Tokenizable {
	_id: string;
	tokenize(): string;
}

export abstract class Expr implements Tokenizable {
	literal: string;
	type: string = "expr";
	
	constructor(public value: string | Array<Token<Expr>>) {	}
	
	protected abstract tokenize() : string

	get _id() { return this.tokenize()}

	toString() { return this.literal }

	static create<T>(value, constructor) : T {
		return new constructor(value);
	}

}