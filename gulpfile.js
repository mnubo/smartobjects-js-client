'use strict';

let gulp = require('gulp');

let Builder = require('systemjs-builder');

gulp.task('dist', (done) => {
    var builder = new Builder();

    builder.config({
        baseURL: 'out',
        paths: {
            '*': '*.js'
        }
    });

    builder.buildStatic('mnubo', 'dist/mnubo.js', {
        sourceMap: true
    });
});
