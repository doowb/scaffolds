'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('download', function (dependency, cb) {
    var resolve = require('resolve-dir');
    var write = require('write');
    var path = require('path');
    var uri = utils.resolveGithubUri(dependency);
    uri += '/manifest.json';

    app.log('Downloading:', utils.gray(dependency));
    app.resolve(uri, function (err, manifest) {
      if (err && err.notFound) {
        app.log(utils.red('Warning:'), err.message, utils.gray(uri));
        return cb();
      }
      if (err) return cb(err);

      var metadata = utils.metadata(manifest);
      var name = metadata.get('name');
      var fp = path.join(resolve('~/.scaffolds'), name, metadata.get('version'), 'manifest.json');
      write(fp, JSON.stringify(metadata, null, 2), function (err) {
        if (err) return cb(err);
        return cb(null, metadata);
      });
    });

  });
};
