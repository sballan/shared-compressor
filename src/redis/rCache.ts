import * as bluebird from 'bluebird';
import rMap from './rMap';

export default class rCache {
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