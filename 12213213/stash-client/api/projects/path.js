"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const basePath = include("api/path");

module.exports = projectKey => `${basePath()}/projects/${projectKey || ""}`;
