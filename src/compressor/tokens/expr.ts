import { Token } from './token';
import { Char, Separator } from './terminal';
import { Word } from './nonterminal';

export function isChar(value: string): boolean {
	return value.match(/[A-Za-z0-9]/) !== null;
}

export abstract class Expr {
	literal: string;
	
	constructor(public value: string | Array<Token<Expr>>) {	}

	static create<T>(value, constructor) : T {
		return new constructor(value);
	}

	toString() { return this.literal }

}