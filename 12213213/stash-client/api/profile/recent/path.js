"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const profilePath = include("api/profile/path");

module.exports = () => `${profilePath()}/recent`;
