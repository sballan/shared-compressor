import { Expr, isChar } from './expr';
import { Terminal } from './terminal';
import { Nonterminal } from './nonterminal';

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

	get literal() { return this.value.literal }

	toString() {
		return `Token: ${this.literal}`;
	}

	static all: Map<symbol, Token<any>> = new Map();
	static index: WeakMap<Expr, symbol> = new WeakMap();

	private static _toLiteral(token: Token<Expr>): string {
		if (token.value instanceof Terminal) {
			return token.literal;
		} else if (token.value instanceof Nonterminal) {
			return this._toLiterals(token.value.value)
		}
	}

	private static _toLiterals(tokens: Token<Expr>[]): string {
		return tokens.map(t => this._toLiteral(t)).join('');
	}

	static toLiteral(token: Token<Expr> | Token<Expr>[]) : string {
		return Array.isArray(token) ?
			this._toLiterals(token) :
			this._toLiteral(token);
	}

	static create<T extends Expr>(value: any, constructor) : Token<T> {
		let expr = Expr.create<T>(value, constructor);
		return new Token<T>(expr);
	}

	static createMany<T extends Expr>(value: any[], constructor) : Token<T>[] {
		return value.map(v => this.create<T>(v, constructor));
	}

}
