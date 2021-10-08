"use strict";

// Third Party
const curryN = require("lodash/fp/curryN");
const include = require("include")(__dirname);

// Project
const activitiesPath = include("api/projects/repos/pullRequests/activities/path");
const asPaged = include("src/createOptions/asPaged");
const createOptions = include("src/createOptions");
const filterProperties = include("src/filterProperties");
const request = include("lib/request");

// Setup
const filterListParams = filterProperties(asPaged(["fromId", "fromType"]));

module.exports = curryN(5, (config, projectKey, repositorySlug, pullRequestId, params) => request(createOptions.forGet(
  config,
  activitiesPath(projectKey, repositorySlug, pullRequestId),
  filterListParams(params)
)));
