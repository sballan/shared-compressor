import * as bluebird from 'bluebird';

export abstract class Cache {
	protected client;
	public id: string;
	public name: string;;

	// name will be the name of the internal map
	constructor(client, name: string) {}
	
	abstract init(): bluebird<any>;

	abstract createKey(value: string): bluebird<string>;

	abstract set(key: string, value: string): bluebird<any>;

	abstract get(key): bluebird<string>;

}