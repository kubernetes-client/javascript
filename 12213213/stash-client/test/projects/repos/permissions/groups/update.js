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
  name: "stash-users",
  permission: "REPO_READ"
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).permissions(repositorySlug).groups().update(params)
  .then(response => response.statusCode === 204 ? console.log(true) : Promise.reject(response.body))
  .catch(console.error);
