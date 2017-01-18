import { Sym } from './sym';
import { Terminal } from './terminal';
import { Nonterminal } from './nonterminal';
// Tokens are Syms with a value that is a Sym[] with no Tokens.  Tokens also have a cache, so they are printable;
export class Token extends Sym {
    public cache: string;

    constructor(
			key: symbol,
			public value: Sym[]
    ) {
			super(key);

			if (Token.dictionary.has(this.key)) {
					return Token.dictionary.get(this.key)
			} else {
					Token.dictionary.set(this.key, this)
			}

			this.build();

		}
	
		get literal() {
			if (!this.cache) this.build();
			return this.cache;
		}

		purge() { this.cache = ""; };
	
    build(value: Sym[] = this.value) : string {
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
			return this.cache = newVals.map(v=> v.value).join('')
    }

    static dictionary: Map<symbol, Token> = new Map();

}