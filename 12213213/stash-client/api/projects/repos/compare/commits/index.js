"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const commitsPath = include("api/projects/repos/compare/commits/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["from", "fromRepo", "to"]));

module.exports = curryN(4, (config, projectKey, repositorySlug, params) => request(createOptions.forGet(
  config,
  commitsPath(projectKey, repositorySlug),
  filterListParams(params)
)));
