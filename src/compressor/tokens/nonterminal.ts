import { Expr, isChar } from './expr';
import { Token } from './token';
import { Terminal, Separator, Char } from './terminal';

export abstract class Nonterminal extends Expr {
	constructor(public value: Expr[]) {
		super(value);
	}

	abstract get literal(): string;

	tokenize(): string {
		return `${this.type}:${this.tokenStrings.join('-')}`;
	}

	get tokenKeys(): string[] {
		return this.value.map(v => `${v.type}:${v.key}`);
	}

	toString() { return this.literal };
}

export class Word extends Nonterminal {
	constructor(public value: Char[]) {
		super(value);
	}

	get literal(): string {
		console.log("WORD", this.value[0])
		return this.value.map(v => v.literal).join('');
	}

	public get type() { return Word.type; }
	static type: string = "wo";

	
	toString() { return this.literal };
}

export class Clause extends Nonterminal {
	constructor(public value: Array<Word | Separator>) {
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
	constructor(public value: Array<Clause | Separator>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}

	public get type() { return Sentence.type; }
	static type: string = "se";
}

export class Paragraph extends Nonterminal {
	constructor(public value: Array<Clause | Separator>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}

	public get type() { return Paragraph.type; }
	static type: string = "pa";
}

export class Corpus extends Nonterminal {
	constructor(public value: Array<Paragraph | Separator>) {
		super(value);
	}

	get literal(): string {
		return this.value.map(v=>v.literal).join('');
	}

	public get type() { return Corpus.type; }
	static type: string = "co";
}