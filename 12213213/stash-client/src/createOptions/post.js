"use strict";

module.exports = (config, path, body, params) => Object.freeze({
  auth: {
    pass: config.password,
    user: config.username
  },
  body: body || "",
  headers: {
    "Content-Type": "application/json"
  },
  json: true,
  method: "POST",
  qs: params,
  url: config.url + path
});
