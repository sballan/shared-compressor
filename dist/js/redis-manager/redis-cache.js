"use strict";
const redis_map_1 = require('./redis-map');
class RedisCache {
    // name will be the name of the internal map
    constructor(client, name) {
        this.client = client;
        this.name = name;
        this.counter = '1';
        this.map = new redis_map_1.RedisMap(this.client, this.name);
    }
    setKey(value, key) {
        return this.map.setKey(value, key);
    }
    setVal(key, value) {
        return this.map.setVal(key, value);
    }
    getVal(key) {
        return this.map.getVal(key);
    }
    getKey(key) {
        return this.map.getKey(key);
    }
    init() {
        return this.incrCounter();
    }
    // returns the new value of counter;
    incrCounter() {
        return this.client.incrAsync(this.name)
            .then(res => { return this.counter = res; });
    }
    createKey(value) {
        return this.getKey(value)
            .then(res => {
            if (res[0]) {
                let key = res[0].replace(`${this.name}:`, '');
                return key;
            }
            else {
                let key;
                return this.incrCounter()
                    .then(res => {
                    key = String(res);
                    return this.set(key, value);
                })
                    .then(res => {
                    return key;
                });
            }
        });
    }
    // TODO remove	
    add(value) {
        return this.createKey(value);
    }
    set(key, value) {
        return this.setVal(key, value)
            .then(res => this.setKey(value, key));
    }
    get(key) {
        return this.getVal(key);
    }
}
exports.RedisCache = RedisCache;
//# sourceMappingURL=redis-cache.js.map