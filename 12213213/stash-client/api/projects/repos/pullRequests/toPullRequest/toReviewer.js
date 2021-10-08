"use strict";

// Third Party
const get = require("lodash/get");
const include = require("include")(__dirname);
const set = require("lodash/set");

// Project
const filterProperties = include("src/filterProperties");
const toUser = include("api/projects/repos/pullRequests/toPullRequest/toUser");

module.exports = values => set(
  filterProperties(["user"], values),
  "user",
  toUser(get(values, "user", {}))
);
