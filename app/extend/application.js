'use strict';

const WEBPACK = Symbol('Application#Webpak');
const TujiWebpack = require('../lib/tujiWebpack');

module.exports = {
  get webpack() {
    if (this[WEBPACK]) {
      return this[WEBPACK];
    }
    this[WEBPACK] = new TujiWebpack(this);
    return this[WEBPACK];
  },
};
