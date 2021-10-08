"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const enablePath = include("api/projects/repos/settings/hooks/enable/path");
const request = include("lib/request");

module.exports = curryN(4, (config, projectKey, repositorySlug, hookKey) => request(createOptions.forPut(
  config,
  enablePath(projectKey, repositorySlug, hookKey)
)));
