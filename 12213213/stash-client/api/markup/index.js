"use strict";

// Third Party
const include = require("include")(__dirname);

module.exports = config => Object.freeze({
  preview() {
    return include("api/markup/preview")(config);
  }
});
