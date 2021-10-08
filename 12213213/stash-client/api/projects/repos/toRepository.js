"use strict";

module.exports = values => {
  values = values || {};

  return Object.seal({
    forkable: values.forkable || true,
    name: values.name,
    scmId: "git"
  });
};
