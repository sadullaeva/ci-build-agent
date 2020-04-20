const axios = require('axios');
const https = require('https');

const { serverHost, serverPort } = config;

const instance = axios.create({
  baseURL: `${serverHost}:${serverPort}/api`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

module.exports = instance;
