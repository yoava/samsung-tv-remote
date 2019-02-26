const path = require('path');
const cli = require('commander');
const debug = require('debug')('samsung-remote');

if (process.argv.find(arg => arg === '--debug')) {
  require('debug').enable('samsung-remote,samsung-remote:*');
  debug('debug mode enabled');
}

require('dotenv-flow').config({ cwd: path.join(__dirname, '..') });
const { sendKey, powerOff, powerOn } = require('./control');

cli
  .version('0.1.0')
  .description('remote control for samsung smart tv')
  .option('--debug', 'print debug info');

cli.command('power-on')
  .alias('on')
  .description('power on the tv')
  .action(powerOn);

cli.command('power-off')
  .alias('off')
  .description('power off the tv')
  .action(powerOff);

cli.command('send-key <key>')
  .alias('send')
  .description('send a remote control key to tv')
  .action((key) => sendKey(key));

cli.parse(process.argv);

if (!process.argv.length) {
  cli.outputHelp();
}
