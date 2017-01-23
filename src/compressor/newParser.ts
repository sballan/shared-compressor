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

export class Token<T extends Expr> {
	public key: symbol;
	constructor(
		public value: T
	) {
		if (Token.index.has(value)) {
			const key = Token.index.get(value);
			return Token.all.get(key);
		}
		this.key = Symbol();
		Token.all.set(this.key, this);
		Token.index.set(value, this.key);
	}

	static all: Map<symbol, Token<any>> = new Map();
	static index: WeakMap<Expr, symbol> = new WeakMap();

	private static _toLiteral(token: Token<Expr>) : string {
		return token.value.literal;
	}

	private static _toLiterals(tokens: Token<Expr>[]): string {
		return tokens.map(t => this._toLiteral(t)).join('');
	}

	static toLiteral(token: Token<Expr> | Token<Expr>[]) : string {
		return Array.isArray(token) ?
			this._toLiterals(token) :
			this._toLiteral(token);
	}

	private static createOne<T extends Expr>(value: any, constructor) : Token<T> {
		let expr = Expr.create(value, constructor);
		return new Token<T>(expr as T);
	}

	private static createMany<T extends Expr>(value: any[], constructor) : Token<T>[] {
		return value.map(v => this.createOne<T>(v, constructor));
	}

	static create<T extends Expr>(value: any | any[], constructor) : Token<T>[] {
		if (Array.isArray(value)) {
			return this.createMany<T>(value, constructor);
		} else return [this.createOne<T>(value, constructor)];
	}
}

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

export class Parser {
	private input: string[];
	private tokens: Token<Expr>[];


	constructor(input: string) { 
		this.input = input.split('').reverse();
	}

	public run() {
		console.log("About to scan: \n")
		this.scan();
		console.log("About to parse words: \n")
		this.words();
		console.log("About to parse clauses: \n")
		this.clauses();
		console.log("About to parse sentences: \n")
		this.sentences()
		console.log("About to parse paragraphs: \n")
		this.paragraphs();
	}

	private scan() {
		this.tokens = [];

		this.input.forEach(c => {
			const token = Token.create(c, Terminal)[0]
			this.tokens.push(token)
		})
	}

	private words() {
		const words: Array<Token<Word | Terminal>> = [];
		const length = this.tokens.length;

		// buffer for word being parsed
		let buffer: Token<Terminal>[] = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Terminal)) {
				throw Error('Tried to parse Nonterminal as Word')
			}

			switch (true) {
				case token.value.literal === ' ':
					const wordToken = Token.create<Word>(buffer, Word)[0];
					words.push(wordToken, token as Token<Terminal>);
					break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:	
					words.push(token as Token<Terminal>);
					break;	
			}
		}

		return this.tokens = words.reverse();

	}

	private clauses() {
		const clauses: Array<Token<Clause | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Word | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Word) && !(token instanceof Terminal)) {
				throw Error('Tried to parse Phrase as Word')
			}

			switch (true) {
				case token.value.literal === '.' || token.value.literal === ',':
					const phraseToken = Token.create<Clause>(buffer, Clause)[0]
					clauses.push(phraseToken, token as Token<Terminal>);	
						break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:
					clauses.push(token as Token<Terminal>);
					break;
			}

		}

		return this.tokens = clauses.reverse();

	}

	private sentences() {
		const sentences: Array<Token<Sentence | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Clause | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Clause) && !(token instanceof Terminal)) {
				throw Error('Tried to parse Phrase as Word')
			}

			switch (true) {
				case token.value.literal === '.':
					const sentenceToken = Token.create<Sentence>(buffer, Sentence)[0];
					sentences.push(sentenceToken, token as Token<Terminal>);	
						break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:
					sentences.push(token as Token<Terminal>);
					break;
			}

		}

		return this.tokens = sentences.reverse();

	}

	private paragraphs() {
		const paragraphs: Array<Token<Paragraph | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Sentence | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Sentence) && !(token instanceof Terminal)) {
				throw Error('Tried to parse Sentence as Clause')
			}

			switch (true) {
				case token.value.literal === '\n\n':
					const paragraphToken = Token.create<Paragraph>(buffer, Paragraph)[0];
					paragraphs.push(paragraphToken, token as Token<Terminal>);	
					break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:
					paragraphs.push(token as Token<Terminal>);
					break;
			}

		}

		return this.tokens = paragraphs.reverse();

	}

}

