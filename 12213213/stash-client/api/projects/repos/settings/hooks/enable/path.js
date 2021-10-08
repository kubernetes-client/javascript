"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const hooksPath = include("api/projects/repos/settings/hooks/path");

module.exports = (projectKey, repositorySlug, hookKey) => `${hooksPath(projectKey, repositorySlug, hookKey)}/enabled`;
