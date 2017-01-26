import { Expr, isChar } from './expr';
import { Token } from './token';
import { Terminal, Separator, Char } from './terminal';

export abstract class Nonterminal extends Expr {
	constructor(public value: Token<Expr>[]) { super(value); }

	abstract get literal(): string;

	tokenize(): string {
		return `${this.type}:${this.value.map(v=>v.value._id)}`
	}

	get _id() : string {
		return this.tokenize()
	}

	toString() { return this.literal };
}

export class Word extends Nonterminal {
	constructor(public value: Token<Char>[]) { super(value);	}

	get literal(): string {
		console.log("WORD", this.value[0])
		return this.value.map(v => v.literal).join('');
	}

	public get type() { return Word.type; }
	static type: string = "wo";
	
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

	public get type() { return Clause.type; }
	static type: string = "cl";
}

export class Sentence extends Nonterminal {
	constructor(public value: Array<Token<Clause | Separator>>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}
	public get type() { return Sentence.type; }
	static type: string = "se";
}

export class Paragraph extends Nonterminal {
	constructor(public value: Array<Token<Clause | Separator>>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}

	public get type() { return Paragraph.type; }
	static type: string = "pa";
}

export class Corpus extends Nonterminal {
	constructor(public value: Array<Token<Paragraph | Separator>>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}

	public get type() { return Corpus.type; }
	static type: string = "co";
}