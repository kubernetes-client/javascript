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
const params = {
  name: "username",
  permission: "PROJECT_READ"
};

// jscs:disable jsDoc
stash(config).api().projects().permissions(projectKey).users().update(params)
  .then(response => console.log(response.statusCode === 204))
  .catch(console.error);
