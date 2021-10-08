"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const tagsPath = include("api/projects/repos/tags/path");

// Setup
const filterListParams = filterProperties(asPaged(["filterText", "orderBy"]));

module.exports = curryN(4, (config, projectKey, repositorySlug, params) => request(createOptions.forGet(
  config,
  tagsPath(projectKey, repositorySlug),
  filterListParams(params)
)));
