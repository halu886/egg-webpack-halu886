'use strict';

const mock = require('egg-mock');

describe('test/webpack-tuji.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/webpack-tuji-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, webpackTuji')
      .expect(200);
  });
});
