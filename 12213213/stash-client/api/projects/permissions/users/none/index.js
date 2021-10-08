"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const nonePath = include("api/projects/permissions/users/none/path");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["filter"]));

module.exports = curryN(3, (config, projectKey, params) => request(createOptions.forGet(
  config,
  nonePath(projectKey),
  filterListParams(params)
)));
