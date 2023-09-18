const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  mongodb: {
    url: `mongodb://localhost:${process.env.MONGO_PORT}/shopper`
  },
  redis: {
    options: {
      url: `redis://localhost:${process.env.REDIS_PORT}`
    },
    client: null
  }
};
