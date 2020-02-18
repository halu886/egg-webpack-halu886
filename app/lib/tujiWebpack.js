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
    this.compile.outputFileSystem = fs;
  }

  getBulder(filePath) {
    if (!this.isBuild) {
      this.logger.warm('waiting...build ing~');
      return {};
    }
    // const pathObject = path.parse(filePath);
    // const pathDirName = pathObject.dir + '/' + pathObject.name;
    // let entryKey = '';
    // const entry = this.options.entry;
    // for (const key in entry) {
    //   if (entry[key].include(pathDirName)) {
    //     entryKey = key;
    //   }
    // }
    const appRoot = this.app.baseDir;
    console.log(path.join(appRoot, 'dist', filePath));
    const contentString = this.compile.outputFileSystem.readFileSync(path.join(appRoot, 'dist', filePath), 'utf-8');
    return contentString;
  }
};
