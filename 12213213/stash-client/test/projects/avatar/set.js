"use strict";

// Node
const path = require("path");

// Third Party
const defaults = require("lodash/defaults");
const include = require("include")(__dirname);

// Project
const stash = include("index"); // Normally: require("stash-client");

// Test
const stashConfig = include("test/config");
const config = defaults({}, stashConfig);
const projectKey = "TEST";
const filePath = path.join(__dirname, "test.png");

// jscs:disable jsDoc
stash(config).api().projects().avatar(projectKey).set(filePath)
  .then(response => console.log(response.body))
  .catch(console.error);
