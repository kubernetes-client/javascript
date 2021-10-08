"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const tasksPath = include("api/projects/repos/pullRequests/tasks/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => Object.freeze({
  count() {
    return include("api/projects/repos/pullRequests/tasks/count")(config, projectKey, repositorySlug, pullRequestId);
  },
  list() {
    return request(createOptions.forGet(
      config,
      tasksPath(projectKey, repositorySlug, pullRequestId)
    ));
  }
}));
