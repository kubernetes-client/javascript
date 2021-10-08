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
const repositorySlug = "test-repo-forked";

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).recreate(repositorySlug)
  .then(response => console.log(response.body))
  .catch(console.error);
