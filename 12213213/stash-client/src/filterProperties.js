"use strict";

// Third Party
const curry = require("lodash/curry");
const pick = require("lodash/pick");

// jscs:disable jsDoc
module.exports = curry((params, values) => Object.seal(pick(values || {}, params)), 2);
