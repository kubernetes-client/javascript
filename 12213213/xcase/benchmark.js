'use strict';
let Benchmark = require('benchmark');
let humps = require('humps');
let xcase = require('./es5');
let camelCase = require('lodash').camelCase;
let reduce = require('lodash').reduce;

let objectBare = {"payments":[{"id":358,"created_at":"2016-09-10T08:23:00.601Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":351,"created_at":"2016-09-08T05:45:51.274Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":1000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":344,"created_at":"2016-09-08T05:23:22.792Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":1200,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":297,"created_at":"2016-09-07T22:52:16.183Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":296,"created_at":"2016-09-07T22:51:50.627Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":201,"created_at":"2016-09-06T22:30:53.784Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":200,"created_at":"2016-09-06T22:30:28.323Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":196,"created_at":"2016-09-06T22:16:46.789Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":160,"created_at":"2016-09-06T22:05:19.009Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":500,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":79,"created_at":"2016-09-02T23:12:32.017Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":1000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":76,"created_at":"2016-09-01T22:28:34.224Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gda","phone":"FF","address":"FF","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"ddk"},"value":1000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":40,"created_at":"2016-08-20T04:28:45.484Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":16000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":39,"created_at":"2016-08-20T04:26:41.275Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":8000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":37,"created_at":"2016-08-20T00:24:13.960Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":16000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":36,"created_at":"2016-08-19T18:11:44.340Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":4000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":35,"created_at":"2016-08-19T18:11:08.783Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":2000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":34,"created_at":"2016-08-18T14:02:46.874Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":1000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":33,"created_at":"2016-08-13T00:58:40.838Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":4000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":32,"created_at":"2016-08-13T00:28:41.613Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":2000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":28,"created_at":"2016-08-13T00:25:05.052Z","currency":"EUR","auto_charged":false,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":500,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":22,"created_at":"2016-07-22T14:43:34.524Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":1000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":21,"created_at":"2016-07-22T14:43:20.898Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":1000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":20,"created_at":"2016-07-21T16:33:42.669Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":1000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":19,"created_at":"2016-07-20T23:30:55.313Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":2000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":18,"created_at":"2016-07-19T20:18:20.029Z","currency":"EUR","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Encino","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"dk"},"value":1000,"refunded":false,"user":{"id":3,"email":"rush@test.com"},"subscriptions":[]},{"id":17,"created_at":"2016-07-19T00:32:09.686Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":2000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":14,"created_at":"2016-07-19T00:24:10.509Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":2000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":11,"created_at":"2016-07-19T00:19:10.501Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":1000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":10,"created_at":"2016-07-14T22:40:04.323Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":2000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":9,"created_at":"2016-07-14T22:39:05.630Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":2000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":8,"created_at":"2016-07-14T22:37:18.419Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":2000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":7,"created_at":"2016-07-14T15:04:53.613Z","currency":"USD","auto_charged":true,"bill_to":{"city":"Gdansk","state":null,"address":"Foobar","country":"PL","last_name":"K","first_name":"D","postal_code":"89273","company_name":"DK"},"value":1000,"refunded":false,"user":{"id":2,"email":"rush@test.com.com"},"subscriptions":[]},{"id":6,"created_at":"2016-05-02T17:32:49.329Z","currency":"USD","auto_charged":false,"bill_to":{"city":"Gdansk","state":null,"country":"PL","last_name":"K","first_name":"D","postal_code":"89273"},"value":500,"refunded":false,"user":{"id":1,"email":"admin@test.com"},"subscriptions":[]},{"id":4,"created_at":"2016-05-02T17:31:15.706Z","currency":"USD","auto_charged":false,"bill_to":{"city":"Gdansk","state":null,"country":"PL","last_name":"K","first_name":"D","postal_code":"89273"},"value":500,"refunded":false,"user":{"id":1,"email":"admin@test.com"},"subscriptions":[]},{"id":3,"created_at":"2016-04-06T16:38:31.915Z","currency":"USD","auto_charged":false,"bill_to":{"city":"Gdansk","state":null,"country":"PL","last_name":"K","first_name":"D","postal_code":"89273"},"value":1000,"refunded":false,"user":{"id":1,"email":"admin@test.com"},"subscriptions":[]},{"id":2,"created_at":"2016-02-03T19:53:44.196Z","currency":"usd","auto_charged":false,"bill_to":{"city":"Gdansk","state":null,"country":"PL","last_name":"K","first_name":"D","postal_code":"89273"},"value":500,"refunded":false,"user":{"id":1,"email":"admin@test.com"},"subscriptions":[]},{"id":1,"created_at":"2016-02-03T19:45:58.499Z","currency":"usd","auto_charged":false,"bill_to":{},"value":500,"refunded":false,"user":{"id":1,"email":"admin@test.com"},"subscriptions":[]}]};

let smallObject = {"id":1,"created_at":"2016-02-03T19:45:58.499Z","currency":"usd","auto_charged":false,"bill_to":{},"value_with_tax":500,"refunded":false};
let smallObjectCamelized = xcase.camelizeKeys(smallObject);

let object = {array: []};
for(let i = 0;i < 10;++i) {
  object.array[i] = Object.assign({}, objectBare);
}

let suite = new Benchmark.Suite;

let camelizedObject = xcase.camelizeKeys(object);
let objectPool = [];
function initPool() {
  while(objectPool.length < 10000) {
    objectPool.push(Object.assign({}, object));
  }
}
initPool(); // pool for testing in place camelizeKeys

function onCycle(event) {
  if(objectPool.length == 0) {
    throw new Error('Pool ran out of objects');
  }
  console.log(String(event.target));
  initPool();  
}

function onComplete() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
}

function getStringForDecamelize() {
  return 'fooBarFooBar';
}

function getStringForCamelize() {
  return 'foo_bar_foo';
}

(new Benchmark.Suite)
.add('xcase#camelize', function() {
  xcase.camelize(getStringForCamelize());
})
.add('humps#camelize', function() {
  humps.camelize(getStringForCamelize());
})
.add('lodash#camelCase', function() {
  camelCase(getStringForCamelize());
})
.on('cycle', onCycle).on('complete', onComplete).run();

(new Benchmark.Suite)
.add('xcase#decamelize', function() {
  xcase.decamelize(getStringForDecamelize());
})
.add('humps#decamelize', function() {
  humps.decamelize(getStringForDecamelize());
})
.add('lodash#snakeCase', function() {
  camelCase(getStringForDecamelize());
})
.on('cycle', onCycle).on('complete', onComplete).run();

(new Benchmark.Suite)
.add('xcase#camelizeKeys', function() {
  xcase.camelizeKeys(smallObject);
})
.add('humps#camelizeKeys', function() {
  humps.camelizeKeys(smallObject);
})
.add('lodash#reduce + camelCase', function() {
  reduce(smallObject, function (record, val, key) {
    record[camelCase(key)] = val;
    return record;
  }, {});
})
.on('cycle', onCycle).on('complete', onComplete).run();

(new Benchmark.Suite)
.add('xcase#decamelizeKeys', function() {
  xcase.decamelizeKeys(smallObjectCamelized);
})
.add('humps#decamelizeKeys', function() {
  humps.decamelizeKeys(smallObjectCamelized);
})
.add('lodash#reduce + snakeCase', function() {
  reduce(smallObject, function (record, val, key) {
    record[snakeCase(key)] = val;
    return record;
  }, {});
})
.on('cycle', onCycle).on('complete', onComplete).run();

(new Benchmark.Suite)
.add('xcase#camelizeKeys (large object)', function() {
  xcase.camelizeKeys(objectPool.pop());
})
.add('xcase#camelizeKeys {inPlace: true} (large object)', function() {
  xcase.camelizeKeys(objectPool.pop(), {inPlace: true});
})
.add('humps#camelizeKeys (large object)', function() {
  humps.camelizeKeys(objectPool.pop());
})
.on('cycle', onCycle).on('complete', onComplete).run();

(new Benchmark.Suite)
.add('xcase#decamelizeKeys (large object)', function() {
  xcase.decamelizeKeys(camelizedObject);
})
.add('humps#decamelizeKeys (large object)', function() {
  humps.decamelizeKeys(camelizedObject);
})
.on('cycle', onCycle).on('complete', onComplete).run();
