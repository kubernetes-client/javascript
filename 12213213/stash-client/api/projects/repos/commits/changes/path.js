"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const commitsPath = include("api/projects/repos/commits/path");

module.exports = (projectKey, repositorySlug, commitId) =>
  `${commitsPath(projectKey, repositorySlug, commitId)}/changes`;
