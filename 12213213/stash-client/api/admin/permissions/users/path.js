"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const permissionsPath = include("api/admin/permissions/path");

module.exports = () => `${permissionsPath()}/users`;
