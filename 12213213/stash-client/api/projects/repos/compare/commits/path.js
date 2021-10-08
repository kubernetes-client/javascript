"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const comparePath = include("api/projects/repos/compare/path");

module.exports = (projectKey, repositorySlug) => `${comparePath(projectKey, repositorySlug)}/commits`;
