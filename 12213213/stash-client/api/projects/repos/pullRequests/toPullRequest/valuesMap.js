"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const toRef = include("api/projects/repos/pullRequests/toPullRequest/toRef");
const toReviewers = include("api/projects/repos/pullRequests/toPullRequest/toReviewers");

module.exports = {
  fromRef: toRef,
  reviewers: toReviewers,
  toRef: toRef
};
