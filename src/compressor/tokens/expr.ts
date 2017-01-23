import { Token } from './token';
import { Char, Separator } from './terminal';
import { Word } from './nonterminal';

export function isChar(value: string): boolean {
	return value.match(/[A-Za-z0-9]/) !== null;
}

export abstract class Expr {
	value: string | Array<Token<Expr>>;
	literal: string;

	static create(value, constructor) {
		switch (constructor) {
			case Char:
				return new Char(value);
			case Separator:	
				return new Separator(value);
			case Word:
				return new Word(value);
			default:
				throw Error('Invalid Arguments');
		}
	}

}