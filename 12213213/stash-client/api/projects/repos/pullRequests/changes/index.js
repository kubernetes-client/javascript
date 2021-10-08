"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const mergePath = include("api/projects/repos/pullRequests/changes/path");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["withComments"]));

module.exports = curryN(5, (config, projectKey, repositorySlug, pullRequestId, params) => request(createOptions.forGet(
  config,
  mergePath(projectKey, repositorySlug, pullRequestId),
  filterListParams(params)
)));
