'use strict';

var async = require('async');
var Scaffolds = require('./');
var scaffolds = new Scaffolds();

var repos = [
  'doowb/handlebars-helpers#docs',
  'jonschlinkert/composer',
  'doowb/composer-runtimes',
  'doowb/composer-errors',
  'assemble/assemble#dev',
  'assemble/assemble',
  'jonschlinkert/templates',
];

async.each(repos, scaffolds.install.bind(scaffolds), function (err) {
  if (err) return console.error(err);
  console.log('done');
});
