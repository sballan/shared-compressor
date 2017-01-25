"use strict";
const bluebird = require('bluebird');
const redis_cache_1 = require('./redis-cache');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
describe(`RedisCache`, () => {
    const client = redis.createClient();
    let cache;
    it(`can be instantiated with a client and a name: string`, () => {
        cache = new redis_cache_1.RedisCache(client, 'myCache');
        expect(cache).toBeDefined();
    });
    it(`calls init() to set up it's counter`, (done) => {
        return cache.init()
            .then(res => {
            expect(res).toBeDefined();
        })
            .then(done);
    });
    it(`has a counter field, which can be incremented with incrCounter()`, (done) => {
        let counter = cache.counter;
        return cache.incrCounter()
            .then(res => {
            expect(res).toBe(1 + counter);
        })
            .then(done);
    });
    it(`has a createKey method, which takes a value: string and returns the incremented counter as a unique id`, (done) => {
        const randomVal = Math.random().toString();
        let key;
        return cache.createKey(randomVal)
            .then(res => {
            key = res;
            expect(key).toBe(String(cache.counter));
            return cache.createKey(randomVal);
        })
            .then(res => {
            expect(res).toBe(key);
            done();
        });
    });
});
//# sourceMappingURL=redis-cache.spec.js.map