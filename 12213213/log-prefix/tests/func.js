require('../')(function() { return '[' + Date.now() + '] %s'; });

console.log('test %s', 'log');
console.error('test %s', 'error');
console.warn('test %s', 'warn');
console.info('test %s', 'info');
console.debug('test %s', 'debug');
