"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const branchesPath = include("api/projects/repos/path");

module.exports = (projectKey, repositorySlug, commitId) =>
  `${branchesPath(projectKey, repositorySlug)}/commits/${commitId || ""}`;
