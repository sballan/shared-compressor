import { Expr, isChar } from './expr';

export abstract class Terminal extends Expr {
	constructor(public value: string) { 
		super();
		if (Terminal.all.has(value)) {
			return Terminal.all.get(value)
		}

		Terminal.all.set(value, this);
	}

	get literal() : string {
		return this.value;
	}

	private static _toLiteral(term: Terminal) : string {
		return term.literal;
	}

	private static _toLiterals(terms: Terminal[]) : string {
		return terms.map(t => this._toLiteral(t)).join('');
	}

	static toLiteral(term: Terminal | Terminal[]) : string {
		return Array.isArray(term) ?
			this._toLiterals(term) :
			this._toLiteral(term);
	}

	static all: Map<string, Terminal> = new Map();

}

export class Separator extends Terminal {
	constructor(public value: string) {
		super(value);
		if(isChar(value)) throw new Error('Separators cannot be Chars')
	}

	get literal() : string {
		return this.value;
	}

}

export class Char extends Terminal {
	constructor(public value) {
		super(value);
		if(!isChar(value)) throw new Error('Chars cannot be Separators')
	}

	get literal() : string {
		return this.value;
	}

}
