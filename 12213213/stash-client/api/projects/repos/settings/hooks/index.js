"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const hooksPath = include("api/projects/repos/settings/hooks/path");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["type"]));

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  disable(hookKey) {
    return include("api/projects/repos/settings/hooks/disable")(config, projectKey, repositorySlug, hookKey);
  },
  enable(hookKey) {
    return include("api/projects/repos/settings/hooks/enable")(config, projectKey, repositorySlug, hookKey);
  },
  get(hookKey) {
    return request(createOptions.forGet(
      config,
      hooksPath(projectKey, repositorySlug, hookKey)
    ));
  },
  list(params) {
    return request(createOptions.forGet(
      config,
      hooksPath(projectKey, repositorySlug),
      filterListParams(params)
    ));
  },
  settings(hookKey) {
    return include("api/projects/repos/settings/hooks/settings")(config, projectKey, repositorySlug, hookKey);
  }
}));
