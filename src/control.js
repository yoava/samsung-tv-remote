const Samsung = require('samsung-tv-control').default;
const { KEYS } = require('samsung-tv-control/lib/keys');
const debug = require('debug')('samsung-remote');
const fetch = require('node-fetch');
const config = require('./config');

const control = new Samsung(config);

function sendKey(key) {
  debug('sending', key);
  return new Promise((resolve => {
    control.sendKey(key, resolve);
  }));
}

function powerOff() {
  debug('powering off');
  return sendKey(KEYS.KEY_POWER);
}

function powerOn() {
  debug('powering on');
  return fetch(`http://${config.ip}:8001/api/v2/`, {
    timeout: 100,
  })
    .then(res => {
      if (!res.ok) {
        debug('api status:', res.statusText);
        return Promise.reject(res.statusText);
      } else {
        debug('TV on');
        return control.turnOn();
      }
    })
    .catch(() => {
      debug('TV still offline, powering on');
      return control.turnOn();
    })
    .catch(powerOn);
}

module.exports = {
  powerOn,
  sendKey,
  powerOff,
};
