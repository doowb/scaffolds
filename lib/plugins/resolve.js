'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('resolve', function (dependency, cb) {
    if (typeof dependency === 'object') {
      var keys = Object.keys(dependency);
      return utils.async.each(keys, function (name, next) {
        app.resolve(dependency[name], next);
      }, cb);
    }

    // load locally cached metadata
    var manifest = this.store.get(dependency);
    if (manifest) {
      app.log('Loading:', utils.gray(dependency));
      var metadata = utils.metadata();
      metadata.load(manifest);
      return cb(null, metadata);
    }

    // resolve fully qualified github url from dependency snippet
    var uri = '';
    try {
      uri = utils.resolveGithubUri(dependency);
      uri += '/manifest.json';
    } catch (err) {
      app.log(utils.red('Warning:'), err.message, utils.gray(dependency));
      return cb();
    }

    // download dependency information and dependencies
    app.log('Downloading:', utils.gray(dependency));
    app.download(uri, function (err, manifest) {
      if (err && err.notFound) {
        app.log(utils.red('Warning:'), err.message, utils.gray(uri));
        return cb();
      }
      if (err) return cb(err);

      var metadata = utils.metadata();
      metadata.load(manifest);

      app.store.set(dependency, metadata.toJSON());
      app.save(metadata, function (err) {
        if (err) return cb(err);
        var deps = metadata.get('dependencies');
        if (!deps) return cb(null, metadata);
        return app.resolve(deps, function (err) {
          if (err) return cb(err);
          cb(null, metadata);
        });
      });
    });

  });
};
