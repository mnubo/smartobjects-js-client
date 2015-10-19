'use strict';

let gulp = require('gulp');
let watch = require('gulp-watch');

let Builder = require('systemjs-builder');

let config = {
    path: {
        out: 'out',
        dist: 'dist'
    }
};

gulp.task('watch', () => {
    gulp.watch(`${config.path.out}/**/*.js`, ['dist']);
});

gulp.task('dist', () => {
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
