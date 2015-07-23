// This time around, you will need to modify the tests file. Implementing good tests is a crucial
// part of this challenge (and of part 3 as well).

// I have included implementations for the basic tests, to give some hints as to the proper
// behavior.

QUnit.test('Can publish something, even if there are no subscribers.', function( assert ) {
  expect(0);
  var status;

  QueueWithPromises.create().publish('type', 'something').then(function () {
    status = 'publication finished!';
  });
});


QUnit.test('Subscribed callbacks are not required to return Promises.', function( assert ) {
  var queue = QueueWithPromises.create();
  var status;

  expect(0);
  queue.subscribe(['asdf'], function () {
    status = 'hello!';
  });

  queue.publish('asdf', 1);
});


QUnit.test("Can do simple asynchronous pub / sub with Promises.", function( assert ) {
  var done = assert.async();
  var queue = QueueWithPromises.create();
  var local = null;


  queue.subscribe(['asdf'], function (data) {
    return new RSVP.Promise(function (resolve, reject) {
      setTimeout(function () {
        local = data;
        resolve();
      }, 2000)
    });

  });

  var start = Date.now();

  queue.publish('asdf', 1).then(function () {
    var end = Date.now();
    assert.ok( end - start >= 2000);
    assert.ok( local === 1 );
    done();
  });

});


QUnit.test("Data can be published in order.", function( assert ) {
  var done = assert.async();
  var queue = QueueWithPromises.create();
  var values = [];

  queue.subscribe(['asdf'], function (data) {
    values.push(data);
  });

  queue.publish('asdf', 1).then(function () {
    return queue.publish('asdf', 2);		// What is it returning the promise to?
  }).then(function () {
    return queue.publish('asdf', 3);
  }).then(function () {
    queue.publish('asdf', 4);

  }).then(function () {
    assert.ok( values[0] === 1 );
    assert.ok( values[1] === 2 );
    assert.ok( values[2] === 3 );
    assert.ok( values[3] === 4 );
    done();
  });

});


QUnit.test("Callbacks are not necessarily executed in-order.", function( assert ) {
  var done = assert.async();
  var queue = QueueWithPromises.create();
  var values = [];

  queue.subscribe(['asdf'], function (data) {

    return new RSVP.Promise(function (resolve, reject) {
      values.push(data.content + '-start');

      setTimeout(function () {
        values.push(data.content + '-end');
        resolve();
      }, data.timeout);
    });
  });

  var start = Date.now();

  RSVP.all([												// This is very useful, because it is saying that only when the array of promises have all been 
    queue.publish('asdf', { content: 1, timeout: 1000 }),	// resolved can the next .then function operate
    queue.publish('asdf', { content: 2, timeout: 500  }),
  ]).then(function () {
    var end = Date.now();
    assert.ok( end - start < 1500 );

    assert.ok( values[0] === '1-start' );
    assert.ok( values[1] === '2-start' );

    // The callbacks should fire in the order we call them, but, in general, we cannot make any
    // assumptions about the order in which they will resolve.
    assert.ok( values[2] === '2-end' || values[2] === '1-end' );
    assert.ok( values[3] === '2-end' || values[3] === '1-end' );
    done();
  });

});

/**
 * Tests to cover:
 *   - "Supports multiple receivers to the same event."
 *   - "Can subscribe to multiple event types with one callback."
 * should be pretty similar to synchronous case, so there's no need to re-implement them here.
 *
 * Feel free to reimplement them if you want extra practice and/or confidence that your code is *
 * working correctly.
 *
 * Next, implement additional tests to check whether your code is behaving correctly.
 * Make sure you use assert.async(), following the examples above.
 * Also see http://api.qunitjs.com/async/
 *
 */

QUnit.test("Multiple event types are supported.", function( assert ) {
  throw 'Implement!'
});


QUnit.test("Failures should be isolated across event receivers.", function( assert ) {
  throw 'Implement!'
  // If one of the Promises returned by a callbacks rejects, that should not stop the other
  // callbacks from executing.
});
