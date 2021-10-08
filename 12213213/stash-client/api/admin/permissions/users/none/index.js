"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const nonePath = include("api/admin/permissions/users/none/path");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["filter"]));

module.exports = curry((config, params) => request(createOptions.forGet(
  config,
  nonePath(),
  filterListParams(params)
)));
