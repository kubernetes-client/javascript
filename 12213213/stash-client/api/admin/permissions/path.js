"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const adminPath = include("api/admin/path");

module.exports = () => `${adminPath()}/permissions`;
