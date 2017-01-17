import * as bluebird from 'bluebird';

const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class Manager {
	// ID counters for terminals and nonterminals.
	public tCounter: string = '0';
	public nCounter: string = '0';
	constructor(public client) { }

	// counter will either be created or incremented
	private incrCounter(key: string) : bluebird<string> {
		return this.client.incrAsync(key)
			.then(res => this[key] = String(res))
	}

	private setMapKey(name: string, value: string, key: string ) {
		return this.client.hmsetAsync([`${name}:key`, value, `${name}:${key}`])
	}

	private setMapVal(name: string, key: string, value: string) {
		return this.client.hmsetAsync([`${name}:value`, `${name}:${key}`, value])
	}

	private setMap(name: string, key: string, value: string) {
		return this.setMapVal(name, key, value)
			.then(res => {
				return this.setMapKey(name, value, key)
			})
	}

	private getMapVal(name: string, key: string) : bluebird<string> {
		return this.client.hmgetAsync([`${name}:key`, `${name}:${key}`])
	}

	private getMapKey(name: string, value: string) : bluebird<string> {
		return this.client.hmgetAsync([`${name}:value`, `${name}:${value}`])
	}

	init() {
		return this.incrCounter('tCounter')
			.then(res => this.incrCounter('nCounter'))
	}


	create(name: string, value: string) {
		return this.incrCounter(value)
			.then(res => {
				return this.setMap(name, res, value);
			})
	}

	tCreate(value: string) { return this.create('t', value); }
	nCreate(value: string) { return this.create('n', value); }

	tGetKey(value: string) : bluebird<string> { return this.getMapKey('t', value); }
	tGetVal(key: string) : bluebird<string> { return this.getMapVal('t', key); }
	tSet(key: string, value: string) { return this.setMap('t', key, value); }

	nGetKey(value: string) : bluebird<string> { return this.getMapKey('n', value); }
	nGetVal(key: string) : bluebird<string> { return this.getMapVal('n', key); }
	nSet(key: string, value: string) { return this.setMap('n', key, value); }

	// Takes string value of nonterm values divided by '-', returns string of only terms
	// recursively simplifies the nonterm tokens.
	simplify(nonterm: string) : bluebird<string> {
		const nTokens = nonterm.split('-')
		let tTokens: string = '';

		if (nTokens.length > 0) {
			return bluebird.resolve(nonterm);
		}

		let current: string = nTokens.shift();
		
		while (current[0] !== 'n') {
			tTokens += current;
			current = nTokens.shift();
		}

		const cArr = current.split(':')

		return this.client.hmgetAsync([cArr[0], cArr[1]])
			.then(res => {
				console.log("simplify res: ", res)
				tTokens += res;
				tTokens += nTokens.join('-');
				return this.simplify(tTokens);
			})
	}

	lookupTerm(keyTerm: string) : bluebird<string> {
		return this.tGetVal(keyTerm)
	}

	lookupTerms(keyTerms: string) : bluebird<string> {
		const keyArr = keyTerms.split('t:')
		return bluebird.map(keyArr, this.lookupTerm)
			.then(res => res.join(''));
		
	}

	lookupNonterm(keyNonterm: string) : bluebird<string> {
		return this.nGetVal(keyNonterm)
			.then(res => this.simplify(res))
			.then(res =>  this.lookupTerms(res))
	}

}

// export abstract class r {
// 	public get key() { return `${r.classKey}:${this._key}` }
// 	public value: any;

// 	constructor(
// 			public client,
// 			protected _key: string
// 	) {}

// 	abstract init();
	
// 	static classKey: string = '';

// }

// export class Key extends r {
// 	protected _key: string;
// 	public get key() { return `${this._key}` }

// 	constructor(
// 		client,
// 		key: string,
// 		public value: string
// 	) {
// 		super(client, key);
// 	}
	
// 	init() {
// 		return this.client.hmset(Key.classKey, this.key, this.value);
// 	}

// 	static classKey: string = 'key';

// }

// export class rList extends r {
//     protected _key: string;
//     public get key() { return `${rList.classKey}:${this._key}` }
//     public value = [];

//     push(values: string[]) : bluebird<number>{
//         this.value.push(...values);
//         return this.client.rpushAsync([this.key, ...values]) as bluebird<number>
//     }

//     pop() : bluebird<string> {
// 			this.value.pop();
// 			return this.client.rpopAsync(this.key) as bluebird<string>
//     }

//     unshift(values: string[]) : bluebird<number>{
//         this.value.push(...values);
//         return this.client.lpushAsync(values) as bluebird<number>
//     }

//     shift() : bluebird<string> {
//         this.value.pop();
//         return this.client.rpopAsync(this.key) as bluebird<string>
// 		}
	
// 		init() {
// 			return this.client.hmset(['key:list', this.key, ...this.value]);
// 		}
    
//     static classKey: string = 'list';
// }

// export class rMap extends r {
// 	protected _key: string;
// 	public get key() { return `${rMap.classKey}:${this._key}` }
// 	public value: Map<string, string> = new Map();

// 	private setArray(array: string[]) : bluebird<string> {
// 		for (let i = 0; i < array.length; i+=2) {
// 			this.value.set(array[i], array[i+1])
// 		}
// 		return this.client.hmsetAsync([this.key, ...array]) as bluebird<string>
// 	}
	
// 	set(key: string | string[], value: string): bluebird<string> {
// 		if (Array.isArray(key)) return this.setArray(key);
// 		else {
// 			this.value.set(key, value);
// 			return this.client.hmsetAsync([this.key, key, value]) as bluebird<string>
// 		}
// 	}

// 	get(key: string) : bluebird<Object> {
// 			this.value.get(key);
// 			return this.client.hmgetAsync([this.key, key]) as bluebird<Object>
// 	}

// 	static classKey: string = '';
// }

// export class rTerminal extends Key {
// 	protected _key: string;
// 	public get key() { return `${rTerminal.classKey}:${this._key}` }

// 	constructor(
// 		client,
// 		key: string,
// 		public value: string
// 	) {
// 		super(client, key, value);
// 	}
	
// 	static classKey: string = 'key:terminal';
// 	static make(key) {

// 	}
// }

// export class rNonterminal extends rList {
// 	protected _key: string;
// 	public get key() { return `${rNonterminal.classKey}:${this._key}` }
	
// 	static classKey: string = 'nonterminal';

// 	static make(client, key: string) {
// 		const nonterminal = new rNonterminal(client, key);
// 		const letters = key.split('');

// 	}
// }

// export class rNode extends rMap {
// 	protected _key: string;
// 	public get key() { return `${rNode.classKey}:${this._key}` }
	
// 	static classKey: string = 'node';
// }

// export class Word extends r {
// 	public get key() { return `${Word.classKey}:${this._key}` }
// 	public map: rNode;
// 	public value: rTerminal[]

// 	constructor(
// 		public client,
// 		protected _key: string
// 	) {
// 		super(client, _key);
// 	}

// 	init() {

// 		return this.client.rpush([this.key, this.value])
// 			.then(res => {
// 				this.map.set
// 			})
// 	}
	
// 	static classKey: string = 'word';

// 	static make(client, key, value) : bluebird<Word> {
// 		const word = new Word(client, key);


// 		client.hmset(word.key)

// 	}
// }

// export class Phrase extends r {
// 	public get key() { return `${Phrase.classKey}:${this._key}` }
// 	public value: Word[];
// 	public map: rNode;

// 	constructor(
// 		public client,
// 		protected _key: string
// 	) {
// 		super(client, _key);
// 	}
	
// 	static classKey: string = 'word';
// }

// const client = redis.createClient();
// const myList = new rNonterminal(client, 'MyStuff');
// myList.push(['myPhone', 'myOtherStuff']).then(s => console.log(s));
// myList.pop().then(s => console.log(s));