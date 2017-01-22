import { Key } from './key';

export abstract class Expr {
	public value: string | symbol[]
	public key: symbol
	
	abstract get literal(): string;
	
	static all: Map<symbol, Expr>
	static allVals: Map<symbol, any>

}

export class Terminal extends Expr {
	public key: symbol;

	constructor(
		public value: string,
		key?: symbol
	) {
		super();

		if (Terminal.index.has(value)) {
			let k = Terminal.index.get(value);
			return Terminal.all.get(k);
		} 

		this.key = key || Symbol();

		Terminal.all.set(this.key, this)
		Terminal.allVals.set(this.key, value)
		Terminal.index.set(value, this.key);

	}

	get literal(): string { return this.value }
	
	static all: Map<symbol, Terminal> = new Map()
	static allVals: Map<symbol, string> = new Map()
	static index: Map<string, symbol> = new Map()

	static create(value: string, key?: symbol) : Terminal {
		return new Terminal(value, key);
	}

	static literal(terminal: Terminal | Terminal[]): string {
		if (Array.isArray(terminal)) {
			return terminal.map(t=> this.literal(t)).join('')
		}
		return Terminal.allVals.get(terminal.key)
	}


}

export class Nonterminal extends Expr {
	public value: symbol[];
	public key: symbol;

	constructor(
		value: Array<Terminal | Nonterminal>,
		key?: symbol
	) {
		super();
		console.log("Value", value)
		if (Nonterminal.index.has(value)) {
			console.log("----- INVOKED")
			const s = Nonterminal.index.get(value)
			return Nonterminal.all.get(s);
		} else {
			console.log("---- NOT INVOKED")
			this.key = this.key || Symbol('a');

			Nonterminal.all.set(this.key, this)
			Nonterminal.allVals.set(this.key, value)
			Nonterminal.index.set(value, this.key)

			const terms = Nonterminal.getTermsForValues(value);
			this.value = terms.map(t => t.key);
			
			console.log('terms',terms)
		}

	}

	get literal() : string {
		return this.terminals.map(v => v.literal).join('')
	}

	get terminals(): Terminal[] {
		return Nonterminal.getTerms(this.value);
	}

	static all: Map<symbol, Nonterminal> = new Map()
	static allVals: Map<symbol, Array<Terminal | Nonterminal>> = new Map()
	static index: WeakMap<Array<Terminal | Nonterminal>, symbol> = new WeakMap()

	static getTerms(keys: symbol[]) : Terminal[] {
		const terms: Terminal[] = [];

		keys.forEach(v => {
			if (Terminal.all.has(v)) {
				terms.push(Terminal.all.get(v));
			}
			else if (Nonterminal.all.has(v)) {
				const n = Nonterminal.all.get(v)
				terms.push(...Nonterminal.getTerms(n.value));
			}
		})

		return terms;
	}
	
	static getTermsForValues(values: Array<Terminal | Nonterminal>) {
		const terms: Terminal[] = [];

		values.forEach(v => {
			if (v instanceof Terminal) {
				terms.push(Terminal.all.get(v.key));
			}
			else terms.push(...v.terminals);
		})

		return terms;
	}

	static create(value: Array<Terminal | Nonterminal>, key?: symbol) : Nonterminal {
		return new Nonterminal(value, key);
	}
}

export class Word extends Nonterminal {
	constructor(
		value: Array<Terminal | Nonterminal>,
		key?: symbol
	) {
		super(value);

		if (this.literal.includes(' ')) {
			throw new Error('Words cannot contain spaces');
		}

		this.key = this.key || Symbol();

		if (Word.all.has(this.key)) {
			return Word.all.get(this.key);
		} 
		Word.all.set(this.key, this)
		Word.allVals.set(this.key, value)

	}

	static all: Map<symbol, Word> = new Map()
	static allVals: Map<symbol, Array<Terminal | Nonterminal>> = new Map()
}

