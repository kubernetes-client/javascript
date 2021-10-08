"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const commitsPath = include("api/projects/repos/path");

module.exports = (projectKey, repositorySlug) => `${commitsPath(projectKey, repositorySlug)}/compare`;
