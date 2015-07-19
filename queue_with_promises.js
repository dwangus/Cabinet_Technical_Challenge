QueueWithPromises = (function () {

  // You may not need or want this inheritance. It's provided as a convenience; feel free to remove
  // it if you're not using it.
  var proto = Object.create(SimpleMessageQueue.prototype);

  // Override the subscribe method from the SimpleMessageQueue prototype, if necessary:

  /**
   * Subscribe to a list of event "types" with the specified callback. Callbacks may return
   * promises.
   *
   * @param {Array} An array of strings, or event "types" to subscribe to.
   * @param {Function} A callback to execute when an event of the right type is published.
   */
  proto.subscribe = function (types, callback) {
    throw 'Implement if needed!'
  };

  // Override the publish method from the SimpleMessageQueue prototype, if necessary:

  /**
   * Publish an event with the specified event "type" and data. Calls any event-specific callbacks
   * that were attached via 'subscribe'.
   *
   * @param {String}
   * @param {*} Data to be passed to any subscription callbacks upon publication.
   *
   * @return {Promise} resolved when all the Promises returned by the 'subscribe' callbacks have
   *                   been resolved or rejected. If a 'subscribe' callback promise rejects, this
   *                   promise should wait to reject until all callbacks have either resolved or
   *                   rejected.
   */
  proto.publish = function (type, data) {
    throw 'Implement if needed!';
  };

  return {
    prototype: proto,

    create: function () {
      var ret = Object.create(proto);
      ret.subscrptions = {};
      return ret;
    },
  };

}());
