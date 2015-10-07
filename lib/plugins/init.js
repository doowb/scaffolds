'use strict';

var utils = require('../utils');

var props = [
  'name',
  'description',
  'version',
  'homepage',
  'repository',
  'author',
  'license',
];

module.exports = function (app) {
  app.mixin('init', function (defaults) {
    if (this.initialized) {
      return this;
    }
    defaults = defaults || utils.pick(utils.pkg, props)

    var metadata = utils.metadata();
    metadata.load(defaults);

    this.set('metadata', metadata);
    this.define('initialized', true);
  });
};
