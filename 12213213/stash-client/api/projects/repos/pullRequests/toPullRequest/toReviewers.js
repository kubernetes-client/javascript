"use strict";

// Third Party
const include = require("include")(__dirname);
const map = require("lodash/map");

// Project
const toReviewer = include("api/projects/repos/pullRequests/toPullRequest/toReviewer");

module.exports = values => map(values, toReviewer);
