'use strict';

var utils = require('./lib/utils');
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

var metadata = utils.metadata();
repos.forEach(function (repo) {
  metadata.addDependency(repo, repo);
});

scaffolds.init(metadata.toJSON());
scaffolds.install(function (err, metadata) {
  if (err) return console.error(err);
  console.log('done');
});

// utils.async.each(repos, scaffolds.install.bind(scaffolds), function (err) {
//   if (err) return console.error(err);
//   console.log('done');
// });
