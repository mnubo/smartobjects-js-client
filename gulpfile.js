'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');

var tsProject = typescript.createProject('tsconfig.json');

var config = {
  path: {
    out: 'out',
    dist: 'dist'
  }
};

gulp.task('watch', function() {
  gulp.watch(config.path.out + '/**/*.js', ['build']);
});

gulp.task('build', function() {
  return tsProject
    .src()
    .pipe(typescript(tsProject))
    .js
    .pipe(rename(function(path) {
      path.dirname = path.dirname.substring(4); /* src/ */
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('changelog', () => {
  const conventionalChangelog = require('gulp-conventional-changelog');

  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular',
      releaseCount: 1
    }, {
      // Conventional Changelog Context
      // We have to manually set version number so it doesn't get prefixed with `v`
      // See https://github.com/conventional-changelog/conventional-changelog-core/issues/10
      currentTag: require('./package.json').version
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('dist', ['build'], function() { });
