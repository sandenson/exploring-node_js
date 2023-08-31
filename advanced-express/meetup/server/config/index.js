require('dotenv').config();
const bunyan = require('bunyan')

const path = require('path');

const loggers = {
  development: () => bunyan.createLogger({ name: 'development', level: 'debug' }),
  production: () => bunyan.createLogger({ name: 'production', level: 'info' }),
  test: () => bunyan.createLogger({ name: 'test', level: 'fatal' }),
}

module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    log: loggers.development,
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    sitename: 'Roux Meetups',
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    log: loggers.production,
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
  test: {
    sitename: 'Roux Meetups [Test]',
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback-test.json'),
      avatars: path.join(__dirname, '../data/avatars/test'),
    },
    log: loggers.test,
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};
