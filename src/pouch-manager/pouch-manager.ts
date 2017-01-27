import * as bluebird from 'bluebird';
import * as PouchDb from 'pouchdb';
import { Tokenizable } from '../compressor/tokens';

import { Expr, Token, Terminal, Nonterminal } from '../compressor/tokens';
import { Manager } from '../compressor/manager/abstract-manager';

export interface Writeable {
	_id: string;
	type: string;
	tokenKeys: string[];
	literal: string
}

export class PouchDbManager extends Manager {

	init(options?) {
		this.client = new PouchDb(this.name, options);

	}

	private tokenFactory(token: Token<Tokenizable>): Writeable {
		return {
			_id: token.key,
			type: token.type,
			tokenKeys: token.tokenKeys,
			literal: token.literal
		}
	}

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

	writeTerminals(tokens: Token<Terminal>[]) {
		return this.client.bulkDocs(
			tokens.map(t=>this.tokenFactory(t))
		).then(function (res) {
			console.log("Writing Terminal Tokens!", res)
			// handle response
		}).catch(function (err) {
			console.log(err);
		})
	}

	writeNonterminal(token: Token<Nonterminal>) {
		
	}

	writeToken(token: Token<Tokenizable>) {
		
	}

	// Takes string value of nonterm values divided by '-', returns string of only terms
	// recursively simplifies the nonterm tokens.
	simplify(nonterm: string) : bluebird<string> {
		const nTokens = nonterm.split('-');
		let tTokens: string = '';

		if (nTokens.length > 0) {
			return bluebird.resolve(nonterm);
		}

		let current: string = nTokens.shift();
		
		while (current[0] !== 'n') {
			tTokens += current;
			current = nTokens.shift();
		}

		const cArr = current.split(':');

		return this.client.hmgetAsync([cArr[0], cArr[1]])
			.then(res => {
				tTokens += res;
				tTokens += nTokens.join('-');
				return this.simplify(tTokens);
			})
	}

	lookupTerm(keyTerm: string) : bluebird<string> {
		return this.tCache.get(keyTerm)
	}

	lookupTerms(keyTerms: string) : bluebird<string> {
		const keyArr = keyTerms.split('t:');
		return bluebird.map(keyArr, this.lookupTerm)
			.then(res => res.join(''));
		
	}

	lookupNonterm(keyNonterm: string) : bluebird<string> {
		return this.nCache.get(keyNonterm)
			.then(res => this.simplify(res))
			.then(res =>  this.lookupTerms(res))
	}

}