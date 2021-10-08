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
const hookKey = "com.atlassian.stash.plugin.stash-unapprove-reviewers-hook:unapprove-reviewers-hook";
const values = {};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).settings(repositorySlug).hooks().settings(hookKey)
  .update(values)
  .then(response => console.log(response.body))
  .catch(console.error);
