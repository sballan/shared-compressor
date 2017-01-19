import { Sym } from './sym';
import { Terminal } from './terminal';
import { Nonterminal } from './nonterminal';
// Tokens are Syms with a value that is a Sym[] with no Tokens.  Tokens also have a cache, so they are printable;
export class Token extends Sym {
    public cache: string = Symbol.keyFor(this.key)

    constructor(
			public value: Sym[]
    ) {
			super(Token.build(value));

			if (Token.dictionary.has(this.key)) {
					return Token.dictionary.get(this.key)
			} else {
					Token.dictionary.set(this.key, this)
			}

		}
	
		get literal() {
			if (!this.cache) this.build();
			return this.cache;
		}

		purge() { this.cache = null; };
	
    build() : string {
			return this.cache = Token.build(this.value)
    }

	
		static dictionary: Map<symbol, Token> = new Map();
		
		static build(value: Sym[]): string {
			let finished: boolean = false;
			let newVals: Sym[] = [];	

			// reduce all Tokens
			while (!finished) {
				finished = true;
				value.forEach(s => {
					if (s instanceof Token) {
						finished = false;
						newVals.push(...s.value)
					} else {
						newVals.push(s)
					}
				});
				value = newVals;
			}


			return newVals.map(v=> v.literal).join('')
		}

}