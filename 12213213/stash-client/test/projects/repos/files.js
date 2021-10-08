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
const filePath = "";
const params = {
  at: "7492ed2946e0ba37dd4c913647d7ccf8d07cbeac"
};

// jscs:disable jsDoc
stash(config).api().projects().repos(projectKey).files(repositorySlug, filePath, params)
  .then(response => console.log(response.body))
  .catch(console.error);
