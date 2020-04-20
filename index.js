const path = require('path');
const fs = require('fs');

global.config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'agent-conf.json'), 'utf8'));

const Agent = require('./services/agent');
const api = require('./routes/api');

const agent = new Agent(config.host, config.port);
agent.run();

const express = require('express');

const app = express();

app.use(express.json());

app.use('/api', api);
app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(config.port || 8082);
