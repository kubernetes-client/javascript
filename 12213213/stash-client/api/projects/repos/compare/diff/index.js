"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const diffPath = include("api/projects/repos/compare/diff/path");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["contextLines", "from", "fromRepo", "srcPath", "to", "whitespace"]));

module.exports = curryN(5, (config, projectKey, repositorySlug, filePath, params) => request(createOptions.forGet(
  config,
  diffPath(projectKey, repositorySlug, filePath),
  filterListParams(params)
)));
