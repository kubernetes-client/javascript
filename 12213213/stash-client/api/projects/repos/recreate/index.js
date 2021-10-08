"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const recreatePath = include("api/projects/repos/recreate/path");
const request = include("lib/request");

module.exports = curryN(3, (config, projectKey, repositorySlug) => request(createOptions.forPost(
  config,
  recreatePath(projectKey, repositorySlug)
)));
