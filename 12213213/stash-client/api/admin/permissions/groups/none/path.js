"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const groupsPath = include("api/admin/permissions/groups/path");

module.exports = () => `${groupsPath()}/none`;
