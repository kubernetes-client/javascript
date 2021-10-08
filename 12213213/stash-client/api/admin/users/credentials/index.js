"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const credentialsPath = include("api/admin/users/credentials/path");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const toCredentials = filterProperties(["name", "password", "passwordConfirm"]);

module.exports = curry((config, values) => request(createOptions.forPut(
  config,
  credentialsPath(),
  toCredentials(values)
)));
