"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const nonePath = include("api/projects/repos/permissions/groups/none/path");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["filter"]));

module.exports = curryN(4, (config, projectKey, repositorySlug, params) => request(createOptions.forGet(
  config,
  nonePath(projectKey, repositorySlug),
  filterListParams(params)
)));
