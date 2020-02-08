'use strict';

module.exports = app => {
  if (app.webpack) {
    app.logger.info('over loading webpack~');
  }
}