"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const removeGroupPath = include("api/admin/users/removeGroup/path");
const request = include("lib/request");

// Setup
const toGroupDelete = filterProperties(["context", "itemName"]);

module.exports = curry((config, values) => request(createOptions.forPost(
  config,
  removeGroupPath(),
  toGroupDelete(values)
)));
