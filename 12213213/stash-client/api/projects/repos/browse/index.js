"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const browsePath = include("api/projects/repos/browse/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["at", "blame", "noContent", "type"]));

module.exports = curryN(5, (config, projectKey, repositorySlug, filePath, params) => request(createOptions.forGet(
  config,
  browsePath(projectKey, repositorySlug, filePath),
  filterListParams(params)
)));
