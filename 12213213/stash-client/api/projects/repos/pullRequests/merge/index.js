"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterParams = include("src/filterProperties")(["version"]);
const mergePath = include("api/projects/repos/pullRequests/merge/path");
const request = include("lib/request");

module.exports = curryN(5, (config, projectKey, repositorySlug, pullRequestId, params) => request(createOptions.forPost(
  config,
  mergePath(projectKey, repositorySlug, pullRequestId),
  filterParams(params)
)));
