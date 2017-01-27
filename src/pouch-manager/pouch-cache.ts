import * as bluebird from 'bluebird';
import * as PouchDb from 'pouchdb';

import { Cache } from '../compressor/manager/abstract-cache';
import { RedisMap } from './redis-map';

export class PouchDbCache extends Cache{
	private map: RedisMap;

	// name will be the name of the internal map
	constructor(client, name: string) {
		super(client, name);
		this.client = new PouchDb(name);
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
					return key;
				} else {
					let key;
					return this.incrCounter()
						.then(res => {
							key = String(res);
							return this.set(key, value);
						})
						.then(res => {
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