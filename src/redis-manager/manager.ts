import * as bluebird from 'bluebird';
import { RedisCache } from './redis-cache';
import { Sym, Token, Terminal, Nonterminal } from '../compressor/syms';

export class Manager {
	public tCache = new RedisCache(this.client, 't');
	public nCache = new RedisCache(this.client, 'n');

	constructor(public client) { }

	writeTerm(term: Terminal) : bluebird<string> {
		return this.tCache.createKey(term.value);
	}

	writeTerms(terms: Terminal[]) : bluebird<string[]> {
		return bluebird.map(terms, this.writeTerm)
	}

	writeNonterm(nonterm: Nonterminal) : bluebird<string> {
		return this.writeTerms(nonterm.value)
			.then(res => {
				return this.nCache.createKey(res.join('t:'))
			})
	}
	
	writeToken(token: Token) {
		token.build()
		bluebird.map(token.value, s => {
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
				console.log("simplify res: ", res);
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