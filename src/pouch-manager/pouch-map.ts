import * as bluebird from 'bluebird';
import * as PouchDb from 'pouchdb';

import { Terminal } from '../compressor/tokens';
import { PouchToken Writeable } from './pouch-token';


export class PouchMap {
	constructor(private client, public type, public key) { }

	init(options?) {
		
	}

	set(value: PouchToken) {
		return this.client.put()
	}

	getVal( key: string) : bluebird<string> {
		return this.client.hmgetAsync([`${this.name}:value`, `${this.name}:${key}`])
	}

	getKey(value: string) : bluebird<string> {
		return this.client.hmgetAsync([`${this.name}:key`, value])
	}

	get( key: string) : bluebird<string> {
		return this.getVal(key)
	}

}







export class PouchDbManager extends Manager {



	readTerminal(tokenId: string) {
		return this.client.get(tokenId)
			.then(token => {
				if (token.type !== 'ch' && token.type !== 'se') {
					return Promise.reject({});
				}
				console.log("reading terminal!")
				return token
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	writeTerminal(token: Token<Terminal>) {
		return this.client.put(
			this.tokenFactory(token)
		).then(function (res) {
			console.log("Writing Terminal Token!", res)
			// handle response
		}).catch(function (err) {
			console.log(err);
		})
	}
