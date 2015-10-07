'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('resolve', function (dependency, cb) {
    var resolveDir = require('resolve-dir');
    var writeFile = require('write');
    var path = require('path');
    var uri = utils.resolveGithubUri(dependency);
    uri += '/manifest.json';

    app.log('Downloading:', utils.gray(dependency));
    app.download(uri, function (err, manifest) {
      if (err && err.notFound) {
        app.log(utils.red('Warning:'), err.message, utils.gray(uri));
        return cb();
      }
      if (err) return cb(err);

      var metadata = utils.metadata(manifest);
      var name = metadata.get('name');
      var fp = path.join(resolveDir('~/.scaffolds'), name, metadata.get('version'), 'manifest.json');
      writeFile(fp, JSON.stringify(metadata, null, 2), function (err) {
        if (err) return cb(err);
        var deps = metadata.get('dependencies');
        if (!deps) return cb(null, metadata);
        var keys = Object.keys(deps);
        utils.async.each(keys, function (name, next) {
          app.resolve(deps[name], next);
        }, function (err) {
          if (err) return cb(err);
          return cb(null, metadata);
        });
      });
    });

  });
};
