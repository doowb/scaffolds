'use strict';

var utils = require('../utils');

module.exports = function (app) {
  app.mixin('init', function (defaults) {
    if (this.initialized) return this;
    defaults = defaults || pkg();
    var metadata = utils.metadata();
    metadata.load(defaults);
    this.set('metadata', metadata);
    this.define('initialized', true);
  });
};

function pkg() {
  return {
    name: utils.pkg.name,
    description: utils.pkg.description,
    version: utils.pkg.version,
    homepage: utils.pkg.homepage,
    repository: utils.pkg.repository,
    author: utils.pkg.author,
    license: utils.pkg.license,
  };
}
