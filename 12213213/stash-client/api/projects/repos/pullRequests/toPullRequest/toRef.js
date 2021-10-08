"use strict";

// Third Party
const get = require("lodash/get");
const include = require("include")(__dirname);
const set = require("lodash/set");

// Project
const filterProperties = include("src/filterProperties");
const toRepository = include("api/projects/repos/pullRequests/toPullRequest/toRepository");

module.exports = values => set(
  filterProperties(["id", "repository"], values),
  "repository",
  toRepository(get(values, "repository", {}))
);
