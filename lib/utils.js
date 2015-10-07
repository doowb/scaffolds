'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

require('metadata');
require('ansi-red', 'red');
require('load-pkg', 'pkg');
require('parse-github-url');
require('ansi-gray', 'gray');
require('ansi-green', 'green');

utils.resolveGithubUri = function (str) {
  //https://raw.githubusercontent.com/doowb/handlebars-helpers/docs/manifest.json
  var url = "https://raw.githubusercontent.com/";
  var obj = utils.parseGithubUrl(str);
  return url += obj.repopath + '/' + obj.branch
}

require = fn;
module.exports = utils;
