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

gulp.task('dist', ['build'], function() { });
