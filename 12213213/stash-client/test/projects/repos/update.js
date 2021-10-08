"use strict";

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({}, stashConfig);
const projectKey = "TEST";
const repositorySlug = "test-repo";
const values = {
  "forkable": false,
  "name": "test-repo-updated",
  "project": {
    "key": "TEST"
  },
  "public": true
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).update(repositorySlug, values)
  .then(response => console.log(response.body))
  .catch(console.error);
