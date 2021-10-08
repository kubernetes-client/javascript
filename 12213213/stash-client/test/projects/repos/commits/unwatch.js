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
const commitId = "200528952f87fd1e96cdbe98e83432bde857daf1";

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).commits(repositorySlug).unwatch(commitId)
  .then(response => console.log(response.statusCode === 204))
  .catch(console.error);
