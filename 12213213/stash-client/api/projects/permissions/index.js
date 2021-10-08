"use strict";

// Third Party
const curry = require("lodash/fp/curry");
const include = require("include")(__dirname);

module.exports = curry((config, projectKey) => Object.freeze({
  all(permission) {
    return include("api/projects/permissions/all")(config, projectKey, permission);
  },
  groups() {
    return include("api/projects/permissions/groups")(config, projectKey);
  },
  users() {
    return include("api/projects/permissions/users")(config, projectKey);
  }
}));
