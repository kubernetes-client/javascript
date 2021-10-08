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
const params = {
  from: "refs/heads/dev",
  to: "refs/heads/master"
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).compare(repositorySlug).changes(params)
  .then(response => console.log(response.body))
  .catch(console.error);
