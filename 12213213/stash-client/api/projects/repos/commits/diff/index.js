"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const diffPath = include("api/projects/repos/commits/diff/path");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["contextLines", "since", "srcPath", "whitespace", "withComments"]));

module.exports = curryN(6, (config, projectKey, repositorySlug, commitId, filePath, params) =>
  request(createOptions.forGet(
    config,
    diffPath(projectKey, repositorySlug, commitId, filePath),
    filterListParams(params)
  ))
);
