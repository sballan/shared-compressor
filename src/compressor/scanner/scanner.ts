import { Token,  Terminal, Nonterminal } from '../syms';
import { Manager } from '../../redis-manager'

export class Scanner {
	public terminals: Map<symbol, Terminal> = new Map();
	public nonterminals: WeakSet<Nonterminal> = new WeakSet();

	public tokens: Token[];

	constructor(
		public input: string,
		public manager: Manager
	) { }
	
	private scanTerminals(input: string = this.input) : Terminal[] {
		return input.split('').map(c => {
			const term = Terminal.create(c);
			this.terminals.set(term.key, term)
			return term;
		})
	}

	private tokenizeTerms() {
		this.tokens = [];
		for (let [k, v] of this.terminals) {
			this.tokens.push(new Token(v.key, [v]));
		}
	}

	writeTokens() {
		
	}

	scanByLength(input: string = this.input) {

	}


	

}