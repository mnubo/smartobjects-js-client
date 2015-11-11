'use strict';

const gulp = require('gulp');

const Builder = require('systemjs-builder');

const config = {
  path: {
    out: 'out',
    dist: 'dist'
  }
};

gulp.task('watch', () => {
  gulp.watch(`${config.path.out}/**/*.js`, ['dist']);
});

gulp.task('dist', () => {
  const builder = new Builder();

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
