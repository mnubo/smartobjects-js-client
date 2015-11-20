'use strict';

var gulp = require('gulp');
var typescript = require('gulp-typescript');

var Builder = require('systemjs-builder');

var config = {
  path: {
    out: 'out',
    dist: 'dist'
  }
};

gulp.task('watch', function() {
  gulp.watch(config.path.out + '/**/*.js', ['build']);
});

gulp.task('dist', function() {
  var builder = new Builder();

  builder.config({
    baseURL: 'out',
    paths: {
      '*': '*.js'
    }
  });

  builder.bundle('mnubo', `${config.path.dist}/mnubo.js`, {
    sourceMap: true
  });

  builder.buildStatic('mnubo.static', `${config.path.dist}/mnubo.static.js`, {
    sourceMap: true
  });
});
