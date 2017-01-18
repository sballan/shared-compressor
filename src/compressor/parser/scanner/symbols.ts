export abstract class Sym {
	constructor(
		public key: string | symbol,
		public value: any
	) { }

	// static getSyms(input: string) {
	// 	return input.split('').map(c => {
	// 		if (Sym.dictionary.has(c)) {
	// 			return Sym.dictionary.get(c);
	// 		}
	// 		return new Sym(c, c);
	// 	})
	// }
}

export class Terminal extends Sym {
	constructor(
		public value: string
	) {
		super(Symbol.for(value), value);
		const key = Symbol.for(value);
		
		if (Terminal.dictionary.has(key)) {
			return Terminal.dictionary.get(key);
		}
		Terminal.dictionary.set(key, this);
	}

	static dictionary: Map<symbol, Sym>;

}

export class Nonterminal extends Sym {
	constructor(
		key: string,
		public value: Sym[]
	) {
		super(key, value);

		if (Nonterminal.dictionary.has(key)) {
			return Nonterminal.dictionary.get(key);
		}
		Nonterminal.dictionary.set(key, this);
		
	}

	static dictionary: Map<string, Sym>;
}

export class Parser {
	constructor(public input: string) { }
	
	// Should really make them nodes, in order to keep track of how many.  If it appears less than twice, it's not useful.
	scan(depth: number = 1) {
		for (let i = 0; i < this.input.length; i++) {
			const terminal = new Terminal(this.input[i]);
			const syms: Sym[] = [terminal];

			for (let j = 1; j < depth; j++) {
				syms.push(new Sym(this.input[i + j]));
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