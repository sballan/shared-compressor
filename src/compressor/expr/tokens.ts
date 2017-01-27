import { Expr, ExprManager, ExprType, Terminal, Nonterminal } from './expr';

export abstract class Token<T extends Terminal | Nonterminal> {
	constructor(public readonly expr: T) {}
	
	get literal(): string {
		return this.terminals.map(t => t.value).join('');
	}
	get type() { return this.expr.type; }

	get key() { return this.expr.key }

	get isTerminal():boolean { return this.expr.type === Token.TERM }
	get isNonterminal():boolean { return this.expr.type === Token.NONTERM}
	
	get tokenKeys() : string[] {
		if (this.isNonterminal) {	
			return this.expr.value as string[];
		} else {
			throw Error("Tried to get tokensKeys for Token<Terminal>")
		}
	}

	get terminals() : Terminal[] {
		if (this.isTerminal) return [this.expr as Terminal];
		else {
			return Token.manager.getTerminalsForNonterminal(this.expr as Nonterminal)
		}
	}


	toString() {
		return `Token: ${this.literal}`;
	}

	static manager: ExprManager = new ExprManager()

	static get TERM() : ExprType { return this.manager.TERM; } 
	static get NONTERM() : ExprType { return this.manager.NONTERM;}

}