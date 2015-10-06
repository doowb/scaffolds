/*!
 * scaffolds <https://github.com/doowb/scaffolds>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var Scaffolds = require('../');

describe('scaffolds', function () {
  it('should create an instance', function () {
    var scaffolds = new Scaffolds();
    assert(scaffolds instanceof Scaffolds);
  });

  it('should create an instance without using `new`', function () {
    var scaffolds = Scaffolds();
    assert(scaffolds instanceof Scaffolds);
  });
});
