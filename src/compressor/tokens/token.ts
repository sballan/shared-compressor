import { Expr, isChar } from './expr';

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
