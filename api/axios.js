const axios = require('axios');
const https = require('https');

const { host, port, serverHost, serverPort } = config;

const instance = axios.create({
  baseURL: `http://${serverHost}:${serverPort}/api`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

instance.defaults.headers.common['Referrer'] = `${host}:${port}`;

module.exports = instance;
