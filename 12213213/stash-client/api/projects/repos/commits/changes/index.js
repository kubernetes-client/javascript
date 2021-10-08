"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const changesPath = include("api/projects/repos/commits/changes/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["since", "withComments"]));

module.exports = curryN(5, (config, projectKey, repositorySlug, commitId, params) => request(createOptions.forGet(
  config,
  changesPath(projectKey, repositorySlug, commitId),
  filterListParams(params)
)));
