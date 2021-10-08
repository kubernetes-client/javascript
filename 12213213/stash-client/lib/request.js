"use strict";

// Third Party
const Promise = require("bluebird");
const request = require("request");
const set = require("lodash/set");

// jscs:disable jsDoc
module.exports = options => new Promise((resolve, reject) =>
  request(options, (error, response, body) => error ?
    reject(error) :
    resolve(set(response, "body", body))
  )
);
