export type ExprType = "t" | "n";

export interface Expr {
	type: ExprType
	key: string;
}

export interface Terminal extends Expr {
	type: ExprType
	value: string;
}

export interface Nonterminal extends Expr {
	value: string[];
}

export class ExprManager {
	public TERM: ExprType = 't';
	public NONTERM: ExprType = 'n';
	public dictionary: Map<string, Expr> = new Map()
	public divider: string = '-'


	insert(expr: Expr) : Expr {
		if (!this.dictionary.has(expr.key)) {
			this.dictionary.set(expr.key, expr);
		}
		return this.dictionary.get(expr.key);
	}

	makeTerminalKey(value: string) {
		return `${this.TERM}:value`
	}

	makeNonerminalKey(value: string[]) {
		return `${this.TERM}:${value.join(this.divider)}`
	}

	makeTerminalFromValue(value: string): Terminal {
		const key = this.makeTerminalKey(value);
		const term = {key, value, type: this.TERM}

		return this.insert(term) as Terminal;
	}

	makeNonterminalFromKeys(value: string[]) : Nonterminal {
		const key = this.makeNonerminalKey(value);
		const nonterm = {key, value, type: this.NONTERM}
		return this.insert(nonterm) as Nonterminal;
	}

	getTerminalsForNonterminal(nonterm: Nonterminal) : Terminal[] {
		if(nonterm.type !== this.NONTERM) throw new Error('Not nonterm')
		
		let keys = nonterm.value
		let terms: Terminal[] = [];

		keys.forEach(k => {
			const expr = this.dictionary.get(k)
			if (expr.type === this.TERM) {
				terms.push(expr as Terminal)
			} else {
				terms.push(...this.getTerminalsForNonterminal(expr as Nonterminal))
			}
		})

		return terms;
	}

}