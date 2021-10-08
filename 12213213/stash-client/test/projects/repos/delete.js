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
const repositorySlug = "test-repo-updated";

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).delete(repositorySlug)
  .then(response => console.log([202, 204].indexof(response.statusCode) > -1))
  .catch(console.error);
