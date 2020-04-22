const path = require('path');
const fs = require('fs');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

global.config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'agent-conf.json'), 'utf8'));

const Agent = require('./services/agent');
const api = require('./routes/api');

const agent = new Agent(config.host, config.port);
agent.run();

const app = express();

app.use(express.json());

const swaggerConfig = require('./swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/api', api);
app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(config.port || 8082);
