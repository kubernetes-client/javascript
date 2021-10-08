"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const approvePath = include("api/projects/repos/pullRequests/approve/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, pullRequestId) => request(createOptions.forDelete(
  config,
  approvePath(projectKey, repositorySlug, pullRequestId)
)));
