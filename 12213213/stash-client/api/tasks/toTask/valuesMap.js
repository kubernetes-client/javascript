"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const toAnchor = include("api/tasks/toTask/toAnchor");

module.exports = {
  anchor: toAnchor
};
