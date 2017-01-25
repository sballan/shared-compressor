"use strict";
class RedisMap {
    constructor(client, name) {
        this.client = client;
        this.name = name;
    }
    setKey(value, key) {
        return this.client.hmsetAsync([`${this.name}:key`, value, `${this.name}:${key}`]);
    }
    setVal(key, value) {
        return this.client.hmsetAsync([`${this.name}:value`, `${this.name}:${key}`, value]);
    }
    set(key, value) {
        return this.setVal(key, value)
            .then(res => this.setKey(value, key));
    }
    getVal(key) {
        return this.client.hmgetAsync([`${this.name}:value`, `${this.name}:${key}`]);
    }
    getKey(value) {
        return this.client.hmgetAsync([`${this.name}:key`, value]);
    }
    get(key) {
        return this.getVal(key);
    }
}
exports.RedisMap = RedisMap;
//# sourceMappingURL=redis-map.js.map