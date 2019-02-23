const env = process.env;
const debug = require('debug')('samsung-remote');

const tvConfiguration = {
  name: env.SAMSUNG_REMOTE_NAME,
  ip: env.SAMSUNG_REMOTE_IP,
  mac: env.SAMSUNG_REMOTE_MAC,
  token: env.SAMSUNG_REMOTE_TOKEN,
};

debug('Config:', tvConfiguration);

module.exports = tvConfiguration;
