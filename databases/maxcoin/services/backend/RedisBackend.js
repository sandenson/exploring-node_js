/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const Redis = require('ioredis');
const CoinAPI = require('../CoinAPI');

class RedisBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
  }

  connect() {
    this.client = new Redis(7379);
    return this.client;
  }

  async disconnect() {
    return this.client.disconnect();
  }

  async insert() {
    const data = await this.coinAPI.fetch();

    const values = Object.entries(data.bpi).map(entry => entry.reverse()).flat()

    return this.client.zadd('maxcoin:values', values)
  }

  async getMax() {
    return this.client.zrange('maxcoin:values', -1, -1, 'WITHSCORES')
  }

  async max() {
    console.info('Connection to Redis')
    const connectKey = 'redis-connect'
    console.time(connectKey)

    const client = this.connect()

    if (client) {
      console.info('Successfully connected to Redis')
    } else {
      throw new Error('Connecting to Redis failed!')
    }

    console.timeEnd(connectKey)

    console.info('Inserting into Redis')
    const insertKey = 'redis-insert'
    console.time(insertKey)

    const insertResult = await this.insert()

    console.timeEnd(insertKey)

    console.info(`Inserted ${insertResult}`)

    console.info('Querying Redis')
    const findKey = 'redis-find'
    console.time(findKey)

    const result = await this.getMax()

    console.timeEnd(findKey)

    console.info('Disconnecting from Redis')
    const disconnectKey = 'redis-disconnect'
    console.time(disconnectKey)

    await this.disconnect()

    console.timeEnd(disconnectKey)

    return result
  }
}

module.exports = RedisBackend;