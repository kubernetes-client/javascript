"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const createOptions = include("src/createOptions");
const clusterPath = include("api/admin/cluster/path");
const request = include("lib/request");

module.exports = config => request(createOptions.forGet(config, clusterPath()));
