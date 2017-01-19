import { Sym } from './sym';
import { Terminal } from './terminal';

// A Nonterminal is a Sym with a Sym[] for it's value
export class Nonterminal extends Sym {
	// key property will be the Symbol.for(value)
	constructor(public value: Terminal[]) {
			super(Nonterminal.literal(value))
		}

		public get literal() {
			return Nonterminal.literal(this.value);
		}
	
		static literal(value: Terminal[]) {
			return value.map(v => v.value).join('');
		}
}