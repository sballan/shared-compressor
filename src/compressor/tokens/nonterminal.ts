import { Expr, isChar } from './expr';
import { Token } from './token';
import { Terminal, Separator, Char } from './terminal';

export abstract class Nonterminal implements Expr {
	constructor(public value: Array<Token<Expr>>) {  }

  get literal(): string {
		return Token.toLiteral(this.value);
	}
}

export class Word extends Nonterminal {
	constructor(public value: Array<Token<Char>>) {
		super(value);
	}
}

export class Clause extends Nonterminal {
	constructor(public value: Array<Token<Word | Terminal>>) {
		super(value);
	}
}

export class Sentence extends Nonterminal {
	constructor(public value: Array<Token<Clause | Terminal>>) {
		super(value);
	}
}

export class Paragraph extends Nonterminal {
	constructor(public value: Array<Token<Clause | Terminal>>) {
		super(value);
	}
}

export class Corpus extends Nonterminal {
	constructor(public value: Array<Token<Paragraph | Terminal>>) {
		super(value);
	}
}