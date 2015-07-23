QueueWithPromises = (function () {
  var subscr = {};	// Keys are event names/"types", Paired Values are arrays of callback functions to be executed once published
  var proto = {
  /**
   * Subscribe to a list of event "types" with the specified callback. Callbacks may return
   * promises.
   *
   * @param {Array} An array of strings, or event "types" to subscribe to.
   * @param {Function} A callback to execute when an event of the right type is published.
   */
  subscribe: function (types, callback) {
				for (i = 0; i < types.length; i++){
					event = types[i]
					if (subscr[event] == null){	
						subscr[event] = []
					}
					subscr[event] = subscr[event].concat(callback)
				}
  },

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
  publish: function (type, data) {
			if (data == null){
				throw 'Write something damnit!'
			}
			return new Promise(function(resolve, reject) {
				for (var key in subscr){
					if (key == type){						
						var value = subscr[key];				// an array of functions is value
						for (i = 0; i < value.length; i++){		// access one index, one specific function (now what if one function returns an array of promises)
							try{								// how can you handle multiple promises to be resolved/rejected, and not use RSVP.all (which
								value[i](data).then(function() {// automatically completes if it gets a single reject)
									resolve()					// When you use RSVP.all().then... resolve(), does it ever get to resolve?
								})								// Also, can't declare a var of a new array to be used, because it will vanish in the next iteration
							}
							catch(err){console.log(err)}
						}
					}
				}
			})			
  },}

  return {
    prototype: proto,
    create: function () {
      var ret = Object.create(proto);
      return ret;
    },
  };

}());
