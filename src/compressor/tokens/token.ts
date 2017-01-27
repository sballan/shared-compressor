import { Expr, isChar } from './expr';
import { Terminal } from './terminal';
import { Nonterminal } from './nonterminal';

export interface Tokenizable {
	key: string;
	literal: string;
	type: any;
	value: any;
	tokenize(): string;
	tokenKeys: string[];
}

export class Token<T extends Tokenizable> {
	constructor(
		public readonly value: T
	) {
		if (Token.index.has(value)) {
			const key = Token.index.get(value);
			return Token.all.get(key) as Token<T>;
		}

		Token.index.set(value, this.key);
	}

	get key() { return this.value.tokenize() }
	
	get tokenKeys() { return this.value.tokenKeys}

	get literal() { return this.value.literal; }
	get type() { return this.value.type; }

	toString() {
		return `Token: ${this.literal}`;
	}

	static all: Map<string, Token<Tokenizable>> = new Map();
	static index: WeakMap<Tokenizable, string> = new WeakMap();

	private static _toLiteral(token: Tokenizable): string {
		return token.literal;
	}

	private static _toLiterals(tokens: Tokenizable[]): string {
		return tokens.map(t => this._toLiteral(t)).join('');
	}

	static toLiteral(token: Tokenizable | Tokenizable[]) : string {
		return Array.isArray(token) ?
			this._toLiterals(token) :
			this._toLiteral(token);
	}

	static create<T extends Tokenizable>(value: any, constructor) : Token<T> {
		let expr = Expr.create<T>(value, constructor);
		return new Token<T>(expr);
	}

	static createMany<T extends Tokenizable>(value: any[], constructor) : Token<T>[] {
		return value.map(v => this.create<T>(v, constructor));
	}

}
