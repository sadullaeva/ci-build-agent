const { notifyAgent } = require('../api/serverMethods');

class Agent {
  constructor(host, port) {
    this._host = host;
    this._port = port;

    this._registered = false;
    this._timeoutId = 0;
  }

  run = () => {
    console.log('Agent: AGENT IS RUN');

    clearTimeout(this._timeoutId);

    const TIMEOUT = 30000; // 30s

    this.register()
      .then(() => {
        this._registered = true;

        console.log('Agent: AGENT REGISTERED');
      })
      .catch(err => {
        console.log('Agent: AGENT NOT REGISTERED, TRY AGAIN', err);

        this._timeoutId = setTimeout(this.run, TIMEOUT);
      });
  };

  register = () => {
    return notifyAgent({
      host: this._host,
      port: this._port,
    });
  };
}

module.exports = Agent;
