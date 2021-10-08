"use strict";

// Third Party
const get = require("lodash/get");
const include = require("include")(__dirname);
const set = require("lodash/set");

// Project
const filterProperties = include("src/filterProperties");
const toProject = include("api/projects/repos/pullRequests/toPullRequest/toProject");

module.exports = values => set(
  filterProperties(["name", "project", "slug"], values),
  "project",
  toProject(get(values, "project", {}))
);
