// 'use strict';
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const path = require('path');

const fs = new MemoryFS();

module.exports = class TujiWebpack {
  constructor(app) {
    this.app = app;
    this.options = app.config.webpack;
    this.isBuild = false;
    this.isClientBuild = false;
    this.build();
    this.clientBuiler();
  }

  build() {
    this.compile = webpack(this.options, err => {
      if (err) {
        this.app.logger.error(err);
        return;
      }
      this.isBuild = true;
    });
    this.compile.outputFileSystem = fs;
  }

  getBulder(filePath) {
    if (!this.isBuild) {
      this.app.logger.warm('waiting...build ing~');
      return {};
    }
    const appRoot = this.app.baseDir;
    const contentString = this.compile.outputFileSystem.readFileSync(path.join(appRoot, 'dist', filePath), 'utf-8');
    return contentString;
  }

  clientBuiler() {
    console.log(this.app.config.clientWebpack);
    this.clientCompile = webpack(this.app.config.clientWebpack, err => {
      if (err) {
        this.app.logger.error(err);
        return;
      }
      this.isClientBuild = true;
    });
    // this.clientCompile.outputFileSystem = fs;
  }

  getClientBulder() {
    const appRoot = this.app.baseDir;
    const contentString = require('fs').readFileSync(path.join(appRoot, 'dist', 'vue-ssr-client-manifest.json'), 'utf-8');
    return JSON.parse(contentString);
  }
};
