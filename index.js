/*!
 * scaffolds <https://github.com/doowb/scaffolds>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var option = require('base-options');
var plugins = require('./lib/plugins');

function Scaffolds (options) {
  if (!(this instanceof Scaffolds)) {
    return new Scaffolds(options);
  }
  Base.call(this);
  this.options = options || {};
  this.use(option);
  this.define('plugins', []);
  this.use(plugins);
}

Base.extend(Scaffolds);

Scaffolds.prototype.use = function(fn) {
  var plugin = fn.call(this, this, this.options);
  if (typeof plugin === 'function') {
    this.plugins.push(plugin);
  }
  return this;
};

module.exports = Scaffolds;
