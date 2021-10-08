"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const markupPath = include("api/markup/path");

module.exports = () => `${markupPath()}/preview`;
