"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const groupsPath = include("api/projects/permissions/groups/path");

module.exports = projectKey => `${groupsPath(projectKey)}/none`;
