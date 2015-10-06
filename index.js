/*!
 * scaffolds <https://github.com/doowb/scaffolds>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var Base = require('base-methods');
var option = require('base-options');

function Scaffolds (options) {
  if (!(this instanceof Scaffolds)) {
    return new Scaffolds(options);
  }
  Base.call(this);
  this.options = options || {};
  this.use(option);
}

Base.extend(Scaffolds);

module.exports = Scaffolds;
