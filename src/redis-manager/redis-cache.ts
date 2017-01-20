import * as bluebird from 'bluebird';
import { RedisMap } from './redis-map';

export class RedisCache {
	public counter: string = '1';
	private map: RedisMap;

	// name will be the name of the internal map
	constructor(private client, public name: string) {
		this.map = new RedisMap(this.client, this.name);
	 }
	
	private setKey(value: string, key: string) {
		return this.map.setKey(value, key)
	}

	private setVal(key: string, value: string) {
		return this.map.setVal(key, value)
	}

	private getVal(key: string) : bluebird<string> {
		return this.map.getVal(key);
	}

	private getKey(key: string) : bluebird<string> {
		return this.map.getKey(key);
	}

	init() : bluebird<number> {
		return this.incrCounter();
	}

	// returns the new value of counter;
	incrCounter(): bluebird<number> {
		return this.client.incrAsync(this.name)
			.then(res => { return this.counter = res })
	}

	createKey(value: string): bluebird<string> {
		return this.getKey(value)
			.then(res => {
				if (res[0]) {
					let key = res[0].replace(`${this.name}:`, '');
					console.log("THERE was a res and key", res, key)
					return key;
				} else {
					console.log("NO KEY");
					let key;
					return this.incrCounter()
						.then(res => {
							key = String(res);
							return this.set(key, value);
						})
						.then(res => {
							console.log("final create key", key)
							return key
						});
				}
			})
	}

	// TODO remove	
	add(value: string) {
		return this.createKey(value)
	}

	set(key: string, value: string) {
		return this.setVal(key, value)
			.then(res => this.setKey(value, key));
	}

	get(key) : bluebird<string> {
		return this.getVal(key);
	}


	
}