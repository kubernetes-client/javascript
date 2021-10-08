"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  repos(params) {
    return include("api/profile/recent/repos")(config, params);
  }
});
