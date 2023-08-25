/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const { MongoClient } = require('mongodb')

const CoinAPI = require('../CoinAPI');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = 'mongodb://localhost:37017/maxcoin'
    this.client = null
    this.collection = null
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, {
      directConnection: true,
    })
    this.client = await mongoClient.connect()
    this.collection = this.client.db('maxcoin').collection('values')
    return this.client
  }

  async disconnect() {
    if (this.client) {
      return this.client.close()
    }
    return false
  }

  async insert() {
    const data = await this.coinAPI.fetch()

    const documents = Object.entries(data.bpi).map((entry) => ({
      date: entry[0],
      value: entry[1],
    }))

    return this.collection.insertMany(documents)
  }

  async getMax() {
    return this.collection.findOne({}, { sort: { value: -1 } })
  }

  async max() {
    console.info('Connection to MongoDB')
    const connectKey = 'mongodb-connect'
    console.time(connectKey)

    const client = await this.connect()

    try {
      const ping = await client.db('maxcoin').command({ ping: 1 })
      if (ping.ok !== 1) {
        throw new Error('Connecting to MongoDB failed!')
      }
    } catch (error) {
      throw new Error('Connecting to MongoDB failed!')
    }

    console.timeEnd(connectKey)

    console.info('Inserting into MongoDB')
    const insertKey = 'mongodb-insert'
    console.time(insertKey)

    const insertResult = await this.insert()

    console.timeEnd(insertKey)

    console.info(`Inserted ${insertResult.insertedCount}`)

    console.info('Querying MongoDB')
    const findKey = 'mongodb-find'
    console.time(findKey)

    const doc = await this.getMax()

    console.timeEnd(findKey)

    console.info('Disconnecting from MongoDB')
    const disconnectKey = 'mongodb-disconnect'
    console.time(disconnectKey)

    await this.disconnect()

    console.timeEnd(disconnectKey)

    return {
      date: doc.date,
      value: doc.value,
    }
  }
}

module.exports = MongoBackend;