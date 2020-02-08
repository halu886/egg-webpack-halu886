'use strict';
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const fs = new MemoryFS();

module.exports = class TujiWebpack {
  constructor(app) {
    this.app = app;
    this.options = app.config.webpack;
    this.isBuild = false;
    this.build();
  }

  build() {
    this.compile = webpack(this.options, err => {
      if (err) {
        this.app.logger.error(err);
        return;
      }
      this.isBuild = true;
    });
    // this.compiler.outputFileSystem = fs;
  }

  async getBulder(outPath) {
    if (!this.isBuild) {
      this.logger.warming('waiting...build ing~');
      return {};
    }
    return this.compiler.outputFileSystem.readFileSync(outPath);
  }
};
