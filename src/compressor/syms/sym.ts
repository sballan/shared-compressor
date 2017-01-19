import { Token } from './token'
import { Terminal } from './terminal'
import { Nonterminal } from './nonterminal'

// A Sym is a unique key-value pair
export abstract class Sym {
    public key: symbol;

    constructor(public value: any | any[]) {
			this.key = Symbol.for(value)

			if (Sym.dictionary.has(this.key)) {
					return Sym.dictionary.get(this.key);
			} else {
					Sym.dictionary.set(this.key, this)
			}
		}
	
		abstract get literal(): string;

		static dictionary: Map<symbol, Sym> = new Map();
		
		static build(value: Sym[]): string {
			let finished: boolean = false;
			let newVals: Sym[] = [];

			while (!finished) {
				finished = true;
				value.forEach(s => {
					if (s instanceof Token) {
						finished = false;
						newVals.push(...s.value)
					} else if (s instanceof Nonterminal
											|| s instanceof Terminal) {
						newVals.push(s)
					}
				});
				value = newVals;
			}
			return newVals.map(v=> v.value).join('')
		}
}