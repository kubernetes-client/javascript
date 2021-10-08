"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({
  limit: 100
}, stashConfig);
const projectKey = "TEST";
const repositorySlug = "test-repo";
const pullRequestId = "3";
const commentId = "24934";
const values = {
  text: "Test PR comment -- `updated`.",
  version: 0
};

// 24857 24858 24859 24860 24861

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).pullRequests(repositorySlug).comments(pullRequestId)
  .update(commentId, values)
  .then(response => console.log(response.body))
  .catch(console.error);
