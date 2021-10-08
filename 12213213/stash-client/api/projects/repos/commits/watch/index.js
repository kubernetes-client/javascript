"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const watchPath = include("api/projects/repos/commits/watch/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, commitId) => Object.freeze({
  unwatch() {
    return request(createOptions.forDelete(config, watchPath(projectKey, repositorySlug, commitId)));
  },
  watch() {
    return request(createOptions.forPost(config, watchPath(projectKey, repositorySlug, commitId)));
  }
}));
