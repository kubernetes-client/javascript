"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const permissionsPath = include("api/projects/repos/permissions/path");

module.exports = (projectKey, repositorySlug) => `${permissionsPath(projectKey, repositorySlug)}/users`;
