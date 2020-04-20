const { notifyAgent } = require('../api/serverMethods');

class Agent {
  constructor(host, port) {
    this._host = host;
    this._port = port;

    this._registered = false;
    this._timeoutId = 0;
  }

  run = () => {
    clearTimeout(this._timeoutId);

    const TIMEOUT = 30000; // 30s

    this.register()
      .then(() => {
        this._registered = true;
      })
      .catch(err => {
        console.log('Could not register', err);
      });

    if (!this._registered) {
      this._timeoutId = setTimeout(this.run, TIMEOUT);
    }
  };

  register = () => {
    return notifyAgent({
      host: this._host,
      port: this._port,
    });
  };
}

module.exports = Agent;
