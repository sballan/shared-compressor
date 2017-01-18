// A Sym is a unique key-value pair
export class Sym {
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

    static dictionary: Map<symbol, Sym> = new Map();
}

// A Terminal is a Sym with a string for it's value
export class Terminal extends Sym {
    public value: string;

    static create(value) {
        return new Terminal(value);
    }
}

// A Nonterminal is a Sym with a Sym[] for it's value
export class Nonterminal extends Sym {
    public value: Terminal[];
    public cache: string;

    build(value: Sym[] = this.value) {
        if (!this.cache) {
            this.cache = value.map(v => v.value).join('');
        }
        return this.cache;
    }
}

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

    toString() { return this.build(); }

    purge() { this.cache = ""; };

    build(value: Sym[] = this.value) {
        if (this.cache) return this.cache;

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