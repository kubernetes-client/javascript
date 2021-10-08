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
const values = {
  "title": "Test PR via REST API",
  "description": "Keen!",
  "state": "OPEN",
  "open": true,
  "closed": false,
  "fromRef": {
    "id": "refs/heads/dev",
    "repository": {
      "slug": repositorySlug,
      "project": {
        "key": projectKey
      }
    }
  },
  "toRef": {
    "id": "refs/heads/master",
    "repository": {
      "slug": repositorySlug,
      "project": {
        "key": projectKey
      }
    }
  },
  "locked": false
  // "reviewers": [
  //   {
  //     "user": {
  //       "name": "username"
  //     }
  //   }
  // ]
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).pullRequests(repositorySlug).create(values)
  .then(response => console.log(response.body))
  .catch(console.error);
