"use strict";

// Third Party
const include = require("include")(__dirname);

// Project
const toUser = include("api/projects/repos/pullRequests/participants/toParticipant/toUser");

module.exports = {
  user: toUser
};
