"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const recentPath = include("api/profile/recent/path");

module.exports = () => `${recentPath()}/repos`;
