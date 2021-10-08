"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  avatar(hookKey) {
    return include("api/hooks/avatar")(config, hookKey);
  }
});
