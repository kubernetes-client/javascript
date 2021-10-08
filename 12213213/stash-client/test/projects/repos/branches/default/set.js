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
  "id": "refs/heads/dev"
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).branches(repositorySlug).default().set(values)
  .then(response => console.log(response.statusCode === 204))
  .catch(console.error);
