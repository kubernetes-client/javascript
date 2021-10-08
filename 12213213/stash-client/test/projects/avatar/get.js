"use strict";

// Node
const fs = require("fs");
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
const params = {
  s: 1024
};

// jscs:disable jsDoc
stash(config).api().projects().avatar(projectKey).get(params)
  .then(response => fs.writeFileSync(
    path.join(__dirname, `avatar-${projectKey.toLowerCase()}.png`),
    response.body,
    { encoding: "binary" }
  ))
  .catch(console.error);
