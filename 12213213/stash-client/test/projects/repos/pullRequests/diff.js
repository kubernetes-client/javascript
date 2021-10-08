"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({
  limit: 100
}, stashConfig);
const projectKey = "TEST";
const repositorySlug = "test-repo";
const pullRequestId = "3";
const filePath = "README.md";
const params = {
  srcPath: "README.md"
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).pullRequests(repositorySlug).diff(pullRequestId, filePath, params)
  .then(response => console.log(response.body))
  .catch(console.error);
