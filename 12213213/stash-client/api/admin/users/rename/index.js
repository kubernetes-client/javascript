"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const renamePath = include("api/admin/users/rename/path");
const request = include("lib/request");

// Setup
const toUserRename = filterProperties(["name", "newName"]);

module.exports = curry((config, values) => request(createOptions.forPost(
  config,
  renamePath(),
  toUserRename(values)
)));
