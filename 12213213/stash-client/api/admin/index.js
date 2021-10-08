"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  cluster() {
    return include("api/admin/cluster")(config);
  },
  groups() {
    return include("api/admin/groups")(config);
  },
  license() {
    return include("api/admin/license")(config);
  },
  mailServer() {
    return include("api/admin/mailServer")(config);
  },
  permissions() {
    return include("api/admin/permissions")(config);
  },
  users() {
    return include("api/admin/users")(config);
  }
});
