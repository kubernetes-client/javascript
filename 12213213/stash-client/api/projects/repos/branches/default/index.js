"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const defaultPath = include("api/projects/repos/branches/default/path");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const toDefault = include("api/projects/repos/branches/default/toDefault");

// Setup
const filterListParams = filterProperties(asPaged());

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  list(params) {
    return request(createOptions.forGet(
      config,
      defaultPath(projectKey, repositorySlug),
      filterListParams(params)
    ));
  },
  set(values) {
    return request(createOptions.forPut(config, defaultPath(projectKey, repositorySlug), toDefault(values)));
  }
}));
