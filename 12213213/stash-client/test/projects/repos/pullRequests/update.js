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
const values = {
  "id": pullRequestId,
  "version": 0,
  "title": "Test PR via REST API",
  "description": "Keen!",
  "reviewers": [
    {
      "user": {
        "name": "username"
      }
    }
  ]
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).pullRequests(repositorySlug).update(pullRequestId, values)
  .then(response => console.log(response.body))
  .catch(console.error);
