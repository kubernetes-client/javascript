"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const watchPath = include("api/projects/repos/pullRequests/watch/path");
const request = include("lib/request");

module.exports = (config, projectKey, repositorySlug, pullRequestId) => request(createOptions.forDelete(
  config,
  watchPath(projectKey, repositorySlug, pullRequestId)
));
