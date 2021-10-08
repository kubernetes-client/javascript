"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const projectsPath = include("api/projects/path");

module.exports = (projectKey, repositorySlug) => `${projectsPath(projectKey)}/repos/${repositorySlug || ""}`;
