import { Sym } from './sym';
import { Terminal } from './terminal';

// A Nonterminal is a Sym with a Sym[] for it's value
export class Nonterminal extends Sym {
    public value: Terminal[];

		public get literal() {
			return this.value.map(v => v.value).join('');
		}
}