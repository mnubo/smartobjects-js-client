#!/usr/bin/env node

const conventionalChangelog = require('conventional-changelog');

conventionalChangelog(
  {
    preset: 'angular',
    releaseCount: 1,
  },
  {
    // Conventional Changelog Context
    // We have to manually set version number so it doesn't get prefixed with `v`
    // See https://github.com/conventional-changelog/conventional-changelog-core/issues/10
    currentTag: require('../package.json').version,
  }
).pipe(process.stdout);
