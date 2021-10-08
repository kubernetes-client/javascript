"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const forksPath = include("api/projects/repos/forks/path");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged());

module.exports = curryN(4, (config, projectKey, repositorySlug, params) => request(createOptions.forGet(
  config,
  forksPath(projectKey, repositorySlug),
  filterListParams(params)
)));
