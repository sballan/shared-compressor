import * as redis from 'redis';
import bluebird from 'bluebird';

export class RedisServer {
	public redis;
	public client;
	
	constructor() {
		this.init();
	}

	init() {
		bluebird.promisifyAll(this.redis.RedisClient.prototype);
		bluebird.promisifyAll(this.redis.Multi.prototype);

		this.client = redis.createClient();

		this.client.on("error", err => {
			console.log("Redis Error ", err);
		})
	}
}