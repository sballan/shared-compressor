"use strict";
const bluebird = require('bluebird');
const redis_cache_1 = require('./redis-cache');
const tokens_1 = require('../compressor/tokens');
class Manager {
    constructor(client) {
        this.client = client;
        this.tCache = new redis_cache_1.RedisCache(this.client, 't');
        this.nCache = new redis_cache_1.RedisCache(this.client, 'n');
    }
    init() {
        return this.tCache.init()
            .then(res => this.nCache.init());
    }
    writeTerm(term) {
        return this.tCache.createKey(term.value);
    }
    writeTerms(terms) {
        return bluebird.map(terms, t => this.writeTerm(t));
    }
    writeNonterm(nonterm) {
        return this.writeTerms(nonterm.value)
            .then(res => {
            const tCacheName = `${this.tCache.name}:`;
            const value = tCacheName + res.join(tCacheName);
            return this.nCache.createKey(value);
        });
    }
    writeToken(token) {
        token.build();
        bluebird.map(token.value, s => {
            if (s instanceof tokens_1.Terminal) {
                return this.writeTerm(s);
            }
            else if (s instanceof tokens_1.Nonterminal) {
                return this.writeNonterm(s);
            }
        })
            .then(res => {
            // bluebird.each(token.)
        });
    }
    // Takes string value of nonterm values divided by '-', returns string of only terms
    // recursively simplifies the nonterm tokens.
    simplify(nonterm) {
        const nTokens = nonterm.split('-');
        let tTokens = '';
        if (nTokens.length > 0) {
            return bluebird.resolve(nonterm);
        }
        let current = nTokens.shift();
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
        });
    }
    lookupTerm(keyTerm) {
        return this.tCache.get(keyTerm);
    }
    lookupTerms(keyTerms) {
        const keyArr = keyTerms.split('t:');
        return bluebird.map(keyArr, this.lookupTerm)
            .then(res => res.join(''));
    }
    lookupNonterm(keyNonterm) {
        return this.nCache.get(keyNonterm)
            .then(res => this.simplify(res))
            .then(res => this.lookupTerms(res));
    }
}
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map