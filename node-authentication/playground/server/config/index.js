const logger = require('pino')();
const path = require('path');
require('dotenv').config({
  path: path.join(process.cwd(), '../.env'),
});

module.exports = {
  database: {
    dsn: process.env.MONGO_URL,
    status: {
      connected: false,
      error: false,
    },
  },
  JWT_SECRET: process.env.JWT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  logger,
};
