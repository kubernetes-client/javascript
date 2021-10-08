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
const permission = "PROJECT_READ";

// jscs:disable jsDoc
stash(config).api().projects().permissions(projectKey).all(permission).get()
  .then(response => console.log(response.body))
  .catch(console.error);
