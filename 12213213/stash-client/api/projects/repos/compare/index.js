"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  changes(params) {
    return include("api/projects/repos/compare/changes")(config, projectKey, repositorySlug, params);
  },
  commits(params) {
    return include("api/projects/repos/compare/commits")(config, projectKey, repositorySlug, params);
  },
  diff(filePath, params) {
    return include("api/projects/repos/compare/diff")(config, projectKey, repositorySlug, filePath, params);
  }
}));
