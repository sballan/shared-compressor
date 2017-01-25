import * as bluebird from 'bluebird';
import { Terminal, Nonterminal } from '../compressor/tokens';

import { RedisMap } from './redis-map';
import { RedisCache } from './redis-cache';
import { RedisManager } from './redis-manager';

const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


xdescribe(`Manager`, () => {
	const client = redis.createClient()
	let manager: RedisManager = new RedisManager(client);
	const tCacheName = manager.tCache.name;
	const nCacheName = manager.nCache.name;

	it(`can be instantiated with a client argument`, () => {	
		expect(manager).toBeDefined();
	})

	it(`can initialize its caches with init()`, (done) => {
		return manager.init().then(done);
	})

	xit(`can write a terminal to redis by passing a Terminal to writeTerm()`, (done) => {
		const termString = 'myTerm';
		const term = new Terminal(termString);

		return manager.writeTerm(term)
			.then(res => {
 				return client.hmgetAsync([`${tCacheName}:value`, `${tCacheName}:${res}`])
			})
			.then(res => {
				return expect(res[0]).toBe(termString);
			})
			.then(done);
	})

	it(`can write an array of terminals to redis by passing a Terminal[] to writeTerms()`, (done) => {
		const termString1 = 'myTerm1';
		const termString2 = 'myTerm2';

		const term1 = new Terminal(termString1);
		const term2 = new Terminal(termString2);
		
		return manager.writeTerms([term1, term2])
			.then(res => {
				return client.hmgetAsync([`${tCacheName}:value`, `${tCacheName}:${res[0]}`, `${tCacheName}:${res[1]}`])
			})
			.then(res => {
				expect(res[0]).toBe(termString1);
				expect(res[1]).toBe(termString2);
			})
			.then(done);
	})

	it(`can write a nonterminal to redis by passing a Nonerminal to writeNonterm()`, (done) => {
		const termString1 = 'Hi ';
		const termString2 = 'Sis!';

		const term1 = new Terminal(termString1);
		const term2 = new Terminal(termString2);
		const nonterm = new Nonterminal([term1, term2]);

		let nontermKey;
		
		return manager.writeNonterm(nonterm)
			.then(res => {
				nontermKey = `${nCacheName}:${res[0]}`
				// console.log("FINAL NONTERMKEY", nontermKey)
				return client.hmgetAsync([`${nCacheName}:value`, nontermKey])
			})
			.then(res => {
				let values = res[0].split(`${tCacheName}:`).map(s => `${tCacheName}:${s}`).shift();
				return client.hmgetAsync([`${tCacheName}:value`, ...values])
			})
			.then(res => {
				// console.log('FINAL RES: ', res);
				expect(res[0]).toBe(nonterm.literal);

			})
			.then(done);
	})


	
})