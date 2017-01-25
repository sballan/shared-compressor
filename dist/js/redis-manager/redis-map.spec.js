"use strict";
const bluebird = require('bluebird');
const redis_map_1 = require('./redis-map');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
describe(`RedisMap`, () => {
    const client = redis.createClient();
    const name = 'myMap';
    let map = new redis_map_1.RedisMap(client, name);
    const myKey = 'myKey';
    const myValue = 'myValue';
    // after each, remove all relevent keys and values	
    afterEach(done => {
        return client.hdelAsync([`${name}:value`, `${name}:${myKey}`])
            .then(res => {
            return client.hdelAsync([`${name}:key`, myValue]);
        })
            .then(done);
    });
    it(`can be instantiated with a client and name argumet`, () => {
        expect(map).toBeDefined();
    });
    it(`can set a key to a value with setVal, passing a key: string and a value: string`, (done) => {
        return map.setVal(myKey, myValue)
            .then(res => {
            return client.hmgetAsync([`${name}:value`, `${name}:${myKey}`]);
        })
            .then(res => {
            expect(res[0]).toBe(myValue);
        })
            .then(done);
    });
    it(`can set a value to a key with setKey, passing a value: string and a key: string`, (done) => {
        return map.setKey(myValue, myKey)
            .then(res => {
            return client.hmgetAsync([`${name}:key`, myValue]);
        })
            .then(res => {
            res = res[0].replace(`${name}:`, ``);
            expect(res).toBe(myKey);
        })
            .then(done);
    });
    it(`it can do both by passing key: string and value: string to set`, (done) => {
        return map.set(myKey, myValue)
            .then(res => {
            return client.hmgetAsync([`${name}:value`, `${name}:${myKey}`]);
        })
            .then(res => {
            expect(res[0]).toBe(myValue);
        })
            .then(done);
    });
    it(`can get value for a key with getVal, passing a key: string`, (done) => {
        return client.hmsetAsync(`${name}:value`, `${name}:${myKey}`, myValue)
            .then(res => {
            return map.getVal(myKey);
        })
            .then(res => {
            expect(res[0]).toBe(myValue);
        })
            .then(done);
    });
    it(`can get key for a value with getKey, passing a value: string`, (done) => {
        return client.hmsetAsync(`${name}:key`, myValue, `${name}:${myKey}`)
            .then(res => {
            return map.getKey(myValue);
        })
            .then(res => {
            res = res[0].replace(`${name}:`, ``);
            expect(res).toBe(myKey);
        })
            .then(done);
    });
    it(`can use get to getVal`, (done) => {
        return client.hmsetAsync(`${name}:value`, `${name}:${myKey}`, myValue)
            .then(res => {
            return map.get(myKey);
        })
            .then(res => {
            expect(res[0]).toBe(myValue);
        })
            .then(done);
    });
});
//# sourceMappingURL=redis-map.spec.js.map