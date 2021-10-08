"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  admin() {
    return include("api/admin")(config);
  },
  applicationProperties() {
    return include("api/applicationProperties")(config);
  },
  hooks() {
    return include("api/hooks")(config);
  },
  logs() {
    return include("api/logs")(config);
  },
  markup() {
    return include("api/markup")(config);
  },
  profile() {
    return include("api/profile")(config);
  },
  projects() {
    return include("api/projects")(config);
  },
  repos(params) {
    return include("api/repos")(config, params);
  },
  users() {
    return include("api/users")(config);
  },
  tasks() {
    return include("api/tasks")(config);
  }
});
