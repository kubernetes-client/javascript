var util = require('util');
var funcs = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  debug: (console.debug || console.log).bind(console)
};

module.exports = patch;

function patch(fn) {
  Object.keys(funcs).forEach(function(k) {
    console[k] = function() {
      var s = typeof fn === 'function' ? fn() : fn;
      arguments[0] = util.format(s, arguments[0]);
      funcs[k].apply(console, arguments);
    };
  });
}
