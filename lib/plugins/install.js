'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('install', function (dependency, cb) {
    if (typeof dependency === 'function') {
      cb = dependency;
      dependency = null;
    }
    app.init();

    if (!dependency) {
      return app.resolve(app.metadata.get('dependencies'), cb);
    }

    app.resolve(dependency, function (err, metadata) {
      if (err) return cb(err);
      if (!metadata) {
        app.log(utils.red('Warning:'), 'Cannot install', utils.gray(dependency));
        return cb();
      }
      app.metadata.addDependency(metadata.get('name'), dependency);
      cb(null, metadata);
    });
  });
};
