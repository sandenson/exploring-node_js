/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const mysql = require('mysql2/promise')
const CoinAPI = require('../CoinAPI');

class MySQLBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      port: 3406,
      user: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'maxcoin',
    });

    return this.connection;
  }

  async disconnect() {
    return this.connection.end()
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const sql = `INSERT INTO coinvalues (valuedate, coinvalue) VALUES ?`
    const values = Object.entries(data.bpi).map((entry) => ([
      entry[0],
      entry[1],
    ]));

    return this.connection.query(sql, [values])
  }

  async getMax() {
    return (await this.connection.query("SELECT * FROM coinvalues ORDER BY coinvalue DESC LIMIT 0,1"))[0][0]
  }

  async max() {
    console.info('Connection to MySQL')
    const connectKey = 'mysql-connect'
    console.time(connectKey)

    const connection = await this.connect()

    if (connection) {
      console.info('Successfully connected to MySQL')
    } else {
      throw new Error('Connecting to MySQL failed!')
    }

    console.timeEnd(connectKey)

    console.info('Inserting into MySQL')
    const insertKey = 'mysql-insert'
    console.time(insertKey)

    const insertResult = await this.insert()

    console.timeEnd(insertKey)

    console.info(`Inserted ${insertResult[0].affectedRows}`)

    console.info('Querying MySQL')
    const findKey = 'mysql-find'
    console.time(findKey)

    const row = await this.getMax()

    console.timeEnd(findKey)

    console.info('Disconnecting from MySQL')
    const disconnectKey = 'mysql-disconnect'
    console.time(disconnectKey)

    await this.disconnect()

    console.timeEnd(disconnectKey)

    return row
  }
}

module.exports = MySQLBackend;