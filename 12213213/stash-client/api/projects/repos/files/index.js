"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filesPath = include("api/projects/repos/files/path");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["at"]));

module.exports = curryN(5, (config, projectKey, repositorySlug, filePath, params) => request(createOptions.forGet(
  config,
  filesPath(projectKey, repositorySlug, filePath),
  filterListParams(params)
)));
