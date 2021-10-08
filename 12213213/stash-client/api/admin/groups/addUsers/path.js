"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const groupsPath = include("api/admin/groups/path");

module.exports = () => `${groupsPath()}/add-users`;
