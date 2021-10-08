"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const addUsersPath = include("api/admin/groups/addUsers/path");
const request = include("lib/request");

// Setup
const toAddUsers = filterProperties(["group", "users"]);

module.exports = curry((config, values) => request(createOptions.forPost(
  config,
  addUsersPath(),
  toAddUsers(values)
)));
