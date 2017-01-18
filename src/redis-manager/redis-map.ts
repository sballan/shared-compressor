import * as bluebird from 'bluebird';

export default class RedisMap {
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