const path = require('path');
const fs = require('fs');

class Config {
  constructor() {
    const config = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '..', 'agent-conf.json'), 'utf8')
    );

    this.host = config.host || 'localhost';
    this.port = process.env.PORT || config.port || 8082;
    this.serverHost = config.serverHost || 'localhost';
    this.serverPort = config.serverPort || 8081;
  }
}

module.exports = Config;
