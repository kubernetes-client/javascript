"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  recent() {
    return include("api/profile/recent")(config);
  }
});
