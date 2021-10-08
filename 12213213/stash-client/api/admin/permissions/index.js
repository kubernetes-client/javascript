"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  groups() {
    return include("api/admin/permissions/groups")(config);
  },
  users() {
    return include("api/admin/permissions/users")(config);
  }
});
