import { Sym } from './sym';
import { Terminal } from './terminal';
import { Nonterminal } from './nonterminal';
// Tokens are Syms with a value that is a Sym[] with no Tokens.  Tokens also have a cache, so they are printable;
export class Token extends Sym {
    public cache: string = Symbol.keyFor(this.key)

    constructor(
			public value: Sym[]
    ) {
			super(Sym.build(value));

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
			return this.cache = Sym.build(this.value)
    }

	
    static dictionary: Map<symbol, Token> = new Map();

}