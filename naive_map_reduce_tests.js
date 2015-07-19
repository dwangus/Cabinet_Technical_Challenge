// Part 3 is intentionally the most open-ended. I am including some demonstration code to show
// how our "naive" MapReduce implementation could behave, but you should feel empowered to change
// the specification if you can think of a way to improve or generalize it.
// Your QueueWithPromises implementation should be part of your solution here.


// You should be able to find good information online about the ideas behind MapReduce. In our case,
// what we want probably includes (but is not limited to):
//
// Basic features:
//   - "map" operations should execute concurrently on partitioned subsets of the input data.

//   - If the "map" operation fails for a particular subset of the data, that "sub-job" should be
//     re-run and incorporated back into the output.
//
// Extra credit:
//   - "reduce" operations should execute concurrently on partitioned subsets of the input data.
//   - Add your own!
//


QUnit.test('Can concurrently compute basic statistics for a set of numbers', function( assert ) {
  var done = assert.async();
  var instance = NaiveMapReduce.create();

  var input = [23, 59, 71, 59, 62, 17, 66, 5, 57, 18, 1, 27, 85, 52, 84, 57, 68, 64];

  // This is one example API... there are many other (potentially better) ways to do this.
  // Using an array allows us to specify an ordering for the operations we want to perform.
  instance.runJob(input, [
    {
      type: 'map',
      operation: function (input) {
        var output;
        // Perform some computation...
        return output;
      },
    },
    {
      type: 'reduce',

      // You could choose to make this an optional parameter:
      initial: 0

      /**
       * @param {*}  The current accumulated result, including all values through n-1.
       * @param {*}  The nth value, to be incorporated into 'memo'.
       * @return {*} The new accumulated result, including all values through n. The result of
       *             incorporating 'value' into 'memo'.
       */
      operation: function (memo, value) {

      },
    },
  ]).then(function (results) {
    // Check that the results are as expected.
    done();
  });

});

// Add additional tests and specifications here:
// Use your imagination, and write something you personally find interesting :)
