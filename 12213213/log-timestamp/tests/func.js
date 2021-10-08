#!/usr/bin/env node

require('../')(function() {
  return '<<' + Date.now() + '>> %s';
});

['debug', 'log', 'info', 'warn', 'error'].forEach(function(k) {
  process.stdout.write('Testing ' + k + '\n');
  console[k]('Hello %s!', 'world');
});
