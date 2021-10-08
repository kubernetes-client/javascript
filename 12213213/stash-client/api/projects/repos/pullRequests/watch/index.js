"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const watchPath = include("api/projects/repos/pullRequests/watch/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => request(createOptions.forPost(
  config,
  watchPath(projectKey, repositorySlug, pullRequestId)
)));
