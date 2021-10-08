"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const addGroupsPath = include("api/admin/users/addGroups/path");
const request = include("lib/request");

// Setup
const toAddGroups = filterProperties(["user", "groups"]);

module.exports = curry((config, values) => request(createOptions.forPost(
  config,
  addGroupsPath(),
  toAddGroups(values)
)));
