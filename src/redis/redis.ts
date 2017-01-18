import * as bluebird from 'bluebird';

const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);



export class rMap {
	constructor(private client, public name) { }

	setKey(value: string, key: string ) {
		return this.client.hmsetAsync([`${this.name}:key`, value, `${this.name}:${key}`])
	}

	setVal(key: string, value: string) {
		return this.client.hmsetAsync([`${this.name}:value`, `${this.name}:${key}`, value])
	}

	set(key: string, value: string) {
		return this.setVal(key, value)
			.then(res => this.setKey(value, key));
	}

	getVal( key: string) : bluebird<string> {
		return this.client.hmgetAsync([`${this.name}:key`, `${this.name}:${key}`])
	}

	getKey(value: string) : bluebird<string> {
		return this.client.hmgetAsync([`${this.name}:value`, `${this.name}:${value}`])
	}

	get( key: string) : bluebird<string> {
		return this.getVal(key)
	}

}

export class rCache {
	public counter: string = '0';
	private map: rMap;

	constructor(private client, public name: string) { }
	
	incrCounter(): bluebird<number> {
		return this.client.incrAsync(this.name)
			.then(res => this.counter = res)
	}

	createKey(value: string) {
		return this.map.getKey(value)
		.then(res => {
				if (res) return String(res);
				else return String(this.incrCounter());
			})
	}

	setKey(value: string, key: string) {
		return this.map.setKey(value, key)
	}

	setVal(key: string, value: string) {
		return this.map.setVal(key, value)
	}

	set(key: string, value: string) {
		return this.setVal(key, value)
			.then(res => this.setKey(value, key));
	}

	getVal(key: string) : bluebird<string> {
		return this.map.getVal(key);
	}

	getKey(key: string) : bluebird<string> {
		return this.map.getKey(key);
	}

	
}

export class Manager {
	public tCache = new rCache(this.client, 't');
	public nCache = new rCache(this.client, 'n');

	constructor(public client) {	}

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
		return this.tCache.getVal(keyTerm)
	}

	lookupTerms(keyTerms: string) : bluebird<string> {
		const keyArr = keyTerms.split('t:')
		return bluebird.map(keyArr, this.lookupTerm)
			.then(res => res.join(''));
		
	}

	lookupNonterm(keyNonterm: string) : bluebird<string> {
		return this.nCache.getVal(keyNonterm)
			.then(res => this.simplify(res))
			.then(res =>  this.lookupTerms(res))
	}

}

export abstract class r {
	public get key() { return `${r.classKey}:${this._key}` }
	public value: any;

	constructor(
			public client,
			protected _key: string
	) {}

	abstract init();
	
	static classKey: string = '';

}


export class rList extends r {
    protected _key: string;
    public get key() { return `${rList.classKey}:${this._key}` }
    public value = [];

    push(values: string[]) : bluebird<number>{
        this.value.push(...values);
        return this.client.rpushAsync([this.key, ...values]) as bluebird<number>
    }

    pop() : bluebird<string> {
			this.value.pop();
			return this.client.rpopAsync(this.key) as bluebird<string>
    }

    unshift(values: string[]) : bluebird<number>{
        this.value.push(...values);
        return this.client.lpushAsync(values) as bluebird<number>
    }

    shift() : bluebird<string> {
        this.value.pop();
        return this.client.rpopAsync(this.key) as bluebird<string>
		}
	
		init() {
			return this.client.hmset(['key:list', this.key, ...this.value]);
		}
    
    static classKey: string = 'list';
}

