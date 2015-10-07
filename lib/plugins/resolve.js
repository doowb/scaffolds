'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('resolve', function (dependency, cb) {
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
      app.save(metadata, function (err) {
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
