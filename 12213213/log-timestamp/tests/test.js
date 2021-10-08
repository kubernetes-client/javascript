#!/usr/bin/env node

require('../');

['debug', 'log', 'info', 'warn', 'error'].forEach(function(k) {
  process.stdout.write('Testing ' + k + '\n');
  console[k]('Hello %s!', 'world');
});
