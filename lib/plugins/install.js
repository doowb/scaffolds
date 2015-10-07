'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('install', function (dependency, cb) {
    app.init();
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
