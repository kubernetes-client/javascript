"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");
const reposPath = include("api/repos/path");

// Setup
const filterListParams = filterProperties(asPaged(["name", "projectname", "permission", "visibility"]));

module.exports = curry((config, params) => request(createOptions.forGet(
  config,
  reposPath(),
  filterListParams(params)
)));
