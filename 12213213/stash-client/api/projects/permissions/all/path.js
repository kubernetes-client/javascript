"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const permissionsPath = include("api/projects/permissions/path");

module.exports = (projectKey, permission) => `${permissionsPath(projectKey, permission)}/all`;
