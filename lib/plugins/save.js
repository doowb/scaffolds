'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('save', function (metadata, cb) {
    var resolveDir = require('resolve-dir');
    var writeFile = require('write');
    var path = require('path');

    var name = metadata.get('name');
    var fp = path.join(resolveDir('~/.scaffolds'), name, metadata.get('version'), 'manifest.json');
    writeFile(fp, JSON.stringify(metadata, null, 2), function (err) {
      if (err) return cb(err);
      cb(null, metadata);
    });
  });
};
