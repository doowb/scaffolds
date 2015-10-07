'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var minimist = require('minimist');
var stylish = require('jshint-stylish');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');
var writeFile = require('write');

var utils = require('./lib/utils');
var Scaffolds = require('./');

var lint = ['index.js', 'lib/**/*.js'];

gulp.task('coverage', function () {
  return gulp.src(lint)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function () {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.writeReports({
      reporters: [ 'text' ],
      reportOpts: {dir: 'coverage', file: 'summary.txt'}
    }))
});

gulp.task('lint', function () {
  return gulp.src(lint.concat('test/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('init', function (done) {
  var scaffolds = new Scaffolds();
  scaffolds.init();
  scaffolds.metadata.addDependencies({
    assemblefile: 'doowb/scaffold-assemblefile',
    docs: 'doowb/scaffold-docs',
    gulpfile: 'doowb/scaffold-gulpfile',
    tests: 'doowb/scaffold-tests',
    verbmd: 'doowb/scaffold-verbmd',
  });
  writeFile('manifest.json', JSON.stringify(scaffolds.metadata, null, 2), done);
});

gulp.task('install', function (done) {
  var scaffolds = new Scaffolds();

  var metadata = utils.metadata();
  metadata.load(require('./manifest.json'));

  scaffolds.init(metadata.toJSON());
  function cb (err, metadata) {
    if (err) return done(err);
    writeFile('manifest.json', JSON.stringify(scaffolds.metadata, null, 2), done);
  }

  var args = minimist(process.argv.slice(2), {alias: {d: 'dep'}});
  if (args.dep) {
    return scaffolds.install(args.dep, cb);
  }
  scaffolds.install(cb);
});

gulp.task('clear:cache', function (done) {
  var scaffolds = new Scaffolds();
  scaffolds.store.del({force: true});
  process.nextTick(done);
});

gulp.task('default', ['lint', 'test']);
