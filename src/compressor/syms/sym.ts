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
			return value.map(v => {
				return v.literal
			}).join('');
		}

}