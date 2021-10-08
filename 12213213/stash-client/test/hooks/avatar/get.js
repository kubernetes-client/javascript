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
const config = defaults({
  limit: 100
}, stashConfig);
const params = {};
const hookKey = "com.atlassian.stash.plugin.stash-unapprove-reviewers-hook:unapprove-reviewers-hook";

// jscs:disable jsDoc
stash(config).api().hooks().avatar(hookKey).get(params)
  .then(response => fs.writeFileSync(
    path.join(__dirname, `avatar-${hookKey.toLowerCase().slice(0, 7)}.png`),
    response.body,
    { encoding: "binary" }
  ))
  .catch(console.error);
