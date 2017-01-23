import { Expr, isChar } from './expr';
import { Token } from './token';
import { Terminal, Separator, Char } from './terminal';

export abstract class Nonterminal extends Expr {
	constructor(public value: Token<Expr>[]) { super(value); }

	abstract get literal(): string;

	toString() { return this.literal };
}

export class Word extends Nonterminal {
	constructor(public value: Token<Char>[]) { super(value);	}

	get literal(): string {
		console.log("WORD", this.value[0])
		return this.value.map(v => v.literal).join('');
	}

	toString() { return this.literal };
}

export class Clause extends Nonterminal {
	constructor(public value: Array<Token<Word | Separator>>) {
		super(value);
	}

	get literal(): string {
		console.log("CLAUSE")
		return this.value.map(v=>v.literal).join('');
	}
}

export class Sentence extends Nonterminal {
	constructor(public value: Array<Token<Clause | Separator>>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}
}

export class Paragraph extends Nonterminal {
	constructor(public value: Array<Token<Clause | Separator>>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}
}

export class Corpus extends Nonterminal {
	constructor(public value: Array<Token<Paragraph | Separator>>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}
}