"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const settingsPath = include("api/projects/repos/settings/path");

module.exports = (projectKey, repositorySlug, hookKey) =>
  `${settingsPath(projectKey, repositorySlug)}/hooks/${hookKey || ""}`;
