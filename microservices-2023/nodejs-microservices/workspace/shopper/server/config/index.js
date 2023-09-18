// Import the package.json file to grab the package name and the version
const pkg = require("../../package.json");

// Export a configuration object
module.exports = {
  // Use the name field from package.json as the application name
  serviceName: pkg.name,
  serviceVersion: pkg.version,

  registry: {
    url: "http://localhost:3080",
    version: "*"
  },

  // MongoDB configuration
  mongodb: {
    // Connection URL for the MongoDB server
    url: `mongodb://localhost:${process.env.MONGO_PORT}/shopper`
  },

  // Redis configuration
  redis: {
    // Connection options for the Redis server
    options: {
      // Connection URL for the Redis server
      url: `redis://localhost:${process.env.REDIS_PORT}`
    },
    // Placeholder for the Redis client, to be connected elsewhere
    client: null
  }
};
