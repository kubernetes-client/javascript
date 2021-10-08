"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const hooksPath = include("api/hooks/path");

module.exports = hookKey => `${hooksPath(hookKey)}/avatar`;
