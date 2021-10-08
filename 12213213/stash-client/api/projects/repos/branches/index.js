"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const branchesPath = include("api/projects/repos/branches/path");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged());

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  default() {
    return include("api/projects/repos/branches/default")(config, projectKey, repositorySlug);
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      branchesPath(projectKey, repositorySlug),
      filterListParams(params)
    ));
  }
}));
