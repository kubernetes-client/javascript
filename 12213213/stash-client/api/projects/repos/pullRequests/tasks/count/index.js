"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const countPath = include("api/projects/repos/pullRequests/tasks/count/path");
const createOptions = include("src/createOptions");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => request(createOptions.forGet(
  config,
  countPath(projectKey, repositorySlug, pullRequestId)
)));
