"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const mergePath = include("api/projects/repos/pullRequests/merge/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => request(createOptions.forGet(
  config,
  mergePath(projectKey, repositorySlug, pullRequestId)
)));
