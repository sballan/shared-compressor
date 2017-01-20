import { Sym } from './sym';
import { Token } from './token';
import { Key } from './key';

// A Nonterminal is a Sym with a Sym[] for it's value
export class Nonterminal extends Sym {
	// key property will be the Symbol.for(value)
	constructor(public value: Sym[]) {
			super(value)
		}

		public get literal() {
			return Nonterminal.literal(this.value);
		}
	
		static literal(value: Token[]) : string {
			return value.map(v => v.value).join('');
		}
}