const pkg = require('../../package.json');

module.exports = {
  applicationName: pkg.name,
  mongodb: {
    url: 'mongodb://localhost:37017/shopper',
  },
  redis: {
    port: 7379,
    client: null,
  },
  mysql: {
    options: {
      host: 'localhost',
      port: 3406,
      database: 'shopper',
      dialect: 'mysql',
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
    },
    client: null,
  }
};
