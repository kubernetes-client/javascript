"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const diffPath = include("api/projects/repos/diff/path");
const filterParams = include("src/filterProperties")(["contextLines", "since", "srcPath", "until", "whitespace"]);
const request = include("lib/request");

module.exports = curryN(5, (config, projectKey, repositorySlug, filePath, params) => request(createOptions.forGet(
  config,
  diffPath(projectKey, repositorySlug, filePath),
  filterParams(params)
)));
