// A Sym is a unique key-value pair
export abstract class Sym {
    public key: symbol;
    public value: any | any[];

    constructor(value) {
			this.key = Symbol.for(value)

			if (Sym.dictionary.has(this.key)) {
					return Sym.dictionary.get(this.key);
			} else {
					Sym.dictionary.set(this.key, this)
			}
		}
	
		abstract get literal(): string;

    static dictionary: Map<symbol, Sym> = new Map();
}