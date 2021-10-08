"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const commitsPath = include("api/projects/repos/commits/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterGetParams = filterProperties(["path"]);
const filterListParams = filterProperties(asPaged(["path", "since", "until", "withCounts"]));

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  changes(commitId) {
    return include("api/projects/repos/commits/changes")(config, projectKey, repositorySlug, commitId);
  },
  comments(commitId) {
    return include("api/projects/repos/commits/comments")(config, projectKey, repositorySlug, commitId);
  },
  diff(commitId, filePath, params) {
    return include("api/projects/repos/commits/diff")(config, projectKey, repositorySlug, commitId, filePath, params);
  },
  get(commitId, params) {
    return request(createOptions.forGet(
      config,
      commitsPath(projectKey, repositorySlug, commitId),
      filterGetParams(params)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      commitsPath(projectKey, repositorySlug),
      filterListParams(params)
    ));
  },
  unwatch(commitId) {
    return include("api/projects/repos/commits/watch")(config, projectKey, repositorySlug, commitId).unwatch();
  },
  watch(commitId) {
    return include("api/projects/repos/commits/watch")(config, projectKey, repositorySlug, commitId).watch();
  }
}));
