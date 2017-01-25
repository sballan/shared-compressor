import * as bluebird from 'bluebird';
import { Cache } from './abstract-cache';

import { Expr, Token, Terminal, Nonterminal } from '../tokens';

export abstract class Manager {
	public tCache: Cache;
	public nCache: Cache;

	constructor(public client) { }

	abstract init(): bluebird<any>

	writeTerm(term: Token<Terminal>) : bluebird<string> {
		return this.tCache.createKey(term);
	}

	writeTerms(terms: Token<Terminal>[]) : bluebird<string[]> {
		return bluebird.map(terms, t => this.writeTerm(t))
	}


	writeNonterm(nonterm: Nonterminal) : bluebird<string> {
		return this.writeTerms(nonterm)
			.then(res => {
				const tCacheName = `${this.tCache.name}:`;
				const value = tCacheName + res.join(tCacheName);
				return this.nCache.createKey(value)
			})
	}
	
	writeToken(token: Token<Expr>) {
		token.build()
		bluebird.map(token.value.value, s => {
			if (s instanceof Terminal) {
				return this.writeTerm(s);
			} else if (s instanceof Nonterminal) {
				return this.writeNonterm(s);
			}
		})
		.then(res => {
			// bluebird.each(token.)
		})
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