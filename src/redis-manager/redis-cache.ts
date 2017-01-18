import * as bluebird from 'bluebird';
import { RedisMap } from './redis-map';

export class RedisCache {
	public counter: string = '0';
	private map: RedisMap;

	constructor(private client, public name: string) { }
	
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

	incrCounter(): bluebird<number> {
		return this.client.incrAsync(this.name)
			.then(res => this.counter = res)
	}

	createKey(value: string) : bluebird<string> {
		return this.map.getKey(value)
		.then(res => {
				if (res) return String(res);
				else return String(this.incrCounter());
			})
	}

	add(value: string) {
		return this.createKey(value)
			.then(key => {
				return this.set(key, value);
			})
	}

	set(key: string, value: string) {
		return this.setVal(key, value)
			.then(res => this.setKey(value, key));
	}

	get(key) : bluebird<string> {
		return this.getVal(key);
	}


	
}