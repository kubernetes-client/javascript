"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const settingsPath = include("api/projects/repos/settings/hooks/settings/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, hookKey) => Object.freeze({
  get() {
    return request(createOptions.forGet(
      config,
      settingsPath(projectKey, repositorySlug, hookKey)
    ));
  },
  update(values) {
    return request(createOptions.forGet(
      config,
      settingsPath(projectKey, repositorySlug),
      values
    ));
  }
}));
