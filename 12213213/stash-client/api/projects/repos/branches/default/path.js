"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const branchesPath = include("api/projects/repos/branches/path");

module.exports = (projectKey, repositorySlug) => `${branchesPath(projectKey, repositorySlug)}/default`;
