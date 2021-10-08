"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const moreNonMembersPath = include("api/admin/groups/moreNonMembers/path");
const request = include("lib/request");

// Setup
const filterGetParams = filterProperties(asPaged(["context", "filter"]));

module.exports = curry((config, params) => request(createOptions.forGet(
  config,
  moreNonMembersPath(),
  filterGetParams(params)
)));
