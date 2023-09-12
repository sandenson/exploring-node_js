const express = require('express');
const ServiceRegistry = require('./lib/ServiceRegistry');

const service = express();
// const ServiceRegistry = require('./ServiceRegistry');

module.exports = (config) => {
  const log = config.log();
  const serviceRegistry = new ServiceRegistry(log);

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.get('/find/:name/:version', (req, res) => {
    const { name, version } = req.params;

    const svc = serviceRegistry.get(name, version);

    if (!svc) return res.status(404).json({ result: 'Service not found' });

    return res.json(svc);
  });

  service.put('/register/:name/:version/:port', (req, res) => {
    const { name, version, port } = req.params;

    const { remoteAddress } = req.socket;
    const ip = remoteAddress.includes('::') ? `[${remoteAddress}]` : remoteAddress;

    const serviceKey = serviceRegistry.register(name, version, ip, port);
    return res.json({ result: serviceKey });
  });

  service.delete('/register/:name/:version/:port', (req, res) => {
    const { name, version, port } = req.params;

    const { remoteAddress } = req.socket;
    const ip = remoteAddress.includes('::') ? `[${remoteAddress}]` : remoteAddress;

    const serviceKey = serviceRegistry.unregister(name, version, ip, port);
    return res.json({ result: serviceKey });
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
