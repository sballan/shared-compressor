export class Sym {
	constructor(
		public key: symbol,
		public value: any
	) {
		if (Sym.dictionary.has(key)) {
			return Sym.dictionary.get(key);
		}
		Sym.dictionary.set(key, this);
	 }

	static dictionary: Map<symbol, Sym>;

	static getSyms(input: string) {
		return input.split('').map(c => {
			const key = Symbol.for(c);
			if (Sym.dictionary.has(key)) {
				return Sym.dictionary.get(key);
			}
			return new Sym(key, c);
		})
	}
}

export class Terminal extends Sym {
	constructor(
		public key: symbol,
		public value: string
	) {
		super(key, value);
	}
}

export class Nonterminal extends Sym {
	constructor(
		key: symbol,
		public value: Sym[]
	) {
		super(key, value);
		
	}
}

export class Parser {
	constructor(public input: string) { }
	
	scan(depth: number = 1) {
		for (let i = 0; i < this.input.length; i++) {
			const terminal = new Terminal(Symbol.for(this.input[i]), this.input[i]);
			const syms: Sym[] = [terminal];

			for (let j = 1; j < depth; j++) {
				syms.push(new Sym(Symbol.for(this.input[i + j]), this.input[i + j]));
				new Nonterminal(Symbol.for(this.input.substring(i, j)), syms);
			}
		}
	}

	parse() {
		const syms: Sym[] = [];

		for (let i = 0; i < this.input.length; i++) {
			let found: boolean = false;
			let largest: Sym = Sym.dictionary.get(Symbol.for(this.input[i]));
			let j = i;

			while (!found) {
				j++;
				const sym = Symbol.for(this.input.substring(i, j));
				if (!Sym.dictionary.has(sym)) {
					i = j;
					syms.push(largest);
					found = true;
				}
			}
		}
	}


}