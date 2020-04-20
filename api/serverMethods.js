const axios = require('./axios');

exports.notifyAgent = body => axios.post('/notify-agent', body);

exports.notifyBuildResult = body => axios.post('/notify-build-result', body);
