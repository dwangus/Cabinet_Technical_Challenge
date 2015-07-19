// Do not modify this file. When you load index.html, these tests will inform you as to whether
// your code is behaving correctly.

QUnit.test('Can publish something, even if there are no subscribers.', function( assert ) {
  expect(0);
  SimpleMessageQueue.create().publish('type', 'something');
});


QUnit.test("Throws an exception if a publication has no content.", function( assert ) {
  assert.raises(function () {
    SimpleMessageQueue.create().publish('type');
  });
});


QUnit.test("Can do simple pub / sub.", function( assert ) {
  var queue = SimpleMessageQueue.create();
  var local = null;

  queue.subscribe(['asdf'], function (data) {
    local = data;
  });

  queue.publish('asdf', 1);

  assert.ok( local === 1 );
});


QUnit.test("Data is published in order", function( assert ) {
  var queue = SimpleMessageQueue.create();
  var values = [];

  queue.subscribe(['asdf'], function (data) {
    values.push(data);
  });

  queue.publish('asdf', 1);
  queue.publish('asdf', 2);
  queue.publish('asdf', 3);
  queue.publish('asdf', 4);

  assert.ok( values[0] === 1 );
  assert.ok( values[1] === 2 );
  assert.ok( values[2] === 3 );
  assert.ok( values[3] === 4 );
});


QUnit.test("Multiple event types are supported.", function( assert ) {
  var queue = SimpleMessageQueue.create();

  var evens = 0;
  var odds  = 0;

  queue.subscribe(['evens'], function () {
    evens += 1;
  });

  queue.subscribe(['odds'], function () {
    odds += 1;
  });

  _.each([1, 2, 3, 4, 5, 6, 7], function (number) {
    queue.publish( (number % 2 === 0) ? 'evens' : 'odds', number);
  });

  assert.ok( evens === 3);
  assert.ok( odds  === 4);
});


QUnit.test("Supports multiple receivers to the same event.", function( assert ) {
  var queue = SimpleMessageQueue.create();

  var n = 1;

  queue.subscribe(['change_n'], function () {
    n *= 5;
  });

  queue.subscribe(['change_n'], function () {
    n *= 7;
  });

  queue.publish('change_n', 'unused');

  assert.ok( n === 35 );
});


QUnit.test("Failures should be isolated across event receivers.", function( assert ) {
  var queue = SimpleMessageQueue.create();

  var counter = 0;

  queue.subscribe(['asdf'], function () {
    counter += 1;
  });

  queue.subscribe(['asdf'], function () {
    throw "I'm an exception!";
  });

  queue.subscribe(['asdf'], function () {
    counter += 2;
  });

  _.each([1,2,3], function () {
    queue.publish('asdf', 'placeholder');
  });

  assert.ok( counter === 9 );
});

QUnit.test("Can subscribe to multiple event types with one callback.", function( assert ) {
  var queue = SimpleMessageQueue.create();
  var values = [];

  queue.subscribe(['asdf', 'qwer', 'foo', 'bar'], function (data) {
    values.push(data);
  });

  queue.publish('qwer', 1);
  queue.publish('bar',  2);
  queue.publish('foo',  3);

  assert.ok( values[0] === 1);
  assert.ok( values[1] === 2);
  assert.ok( values[2] === 3);
});
