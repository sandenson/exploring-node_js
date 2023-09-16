/* eslint-disable class-methods-use-this */
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const CircuitBreaker = require('../lib/CircuitBreaker');

const circuitBreaker = new CircuitBreaker();

const fsExists = async (filePath) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};

class SpeakersService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async getImage(path) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      responseType: 'stream',
      url: `http://${ip}:${port}/images/${path}`,
    });
  }

  async getNames() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/names`,
    });
  }

  async getListShort() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/list-short`,
    });
  }

  async getList() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/list`,
    });
  }

  async getAllArtwork() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/artwork`,
    });
  }

  async getSpeaker(shortname) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/speaker/${shortname}`,
    });
  }

  async getArtworkForSpeaker(shortname) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/artwork/${shortname}`,
    });
  }

  async callService(requestOptions) {
    const servicePath = new URL(requestOptions.url).pathname;

    const cacheKey = crypto.createHash('md5').update(requestOptions.method + servicePath).digest('hex');

    let cacheFile = null;

    if (requestOptions.responseType && requestOptions.responseType === 'stream') {
      cacheFile = path.resolve(process.cwd(), '_imagecache', cacheKey);
    }

    const result = await circuitBreaker.callService(requestOptions);

    if (!result) {
      if (this.cache[cacheKey]) return this.cache[cacheKey];
      if (cacheFile) {
        const exists = await fsExists(cacheFile);
        if (exists) return fs.createReadStream(cacheFile);
      }
      return false;
    }

    if (!cacheFile) {
      this.cache[cacheKey] = result;
    } else {
      const ws = fs.createWriteStream(cacheFile);
      result.pipe(ws);
    }

    return result;
  }

  async getService(serviceName) {
    const response = await axios({
      method: 'get',
      url: `${this.serviceRegistryUrl}/find/${serviceName}/${this.serviceVersionIdentifier}`,
    });
    return response.data;
  }
}

module.exports = SpeakersService;
