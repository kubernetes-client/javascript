"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

module.exports = curryN(3, (config, projectKey, repositorySlug) => Object.freeze({
  groups() {
    return include("api/projects/repos/permissions/groups")(config, projectKey, repositorySlug);
  },
  users() {
    return include("api/projects/repos/permissions/users")(config, projectKey, repositorySlug);
  }
}));
