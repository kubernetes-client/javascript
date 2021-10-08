"use strict";

// Third Party
const pick = require("lodash/pick");

module.exports = values => Object.seal(pick(values || {}, ["id"]));
