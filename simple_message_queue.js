// Your first task is to implement a simple publish / subscribe (or "pub/sub") system.
// Use the code in this file as a blueprint, and modify / add to it as needed.

SimpleMessageQueue = (function () {
	var subscr = {} // Keys are event names/"types", Paired Values are arrays of callback functions to be executed once published
	var proto = {
		/**
		* Subscribe to a list of event "types" with the specified callback.
		*
		* @param {Array} An array of strings, or event "types" to subscribe to.
		* @param {Function} A callback to execute when an event of the right type is published.
		*/
		subscribe: function (types, callback) {
			for (i = 0; i < types.length; i++){
				event = types[i]
				if (subscr[event] == null){			// why is it that subscr.event doesn't work? Is it because event is a string "name" instead of a name?
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
		*/
		publish: function (type, data) {
			if (data == null){
				throw 'Write something damnit!'
			}
			for (var key in subscr){
				if (key == type){
					var value = subscr[key];
					for (i = 0; i < value.length; i++){
						try{value[i](data)}
						catch(err){console.log(err)}
					}
				}
			}
		},
	};

	return {
		prototype: proto,
		// Use this function to instantiate instances of SimpleMessageQueue. See tests.js for the
		// specification of how the instances should behave.
		create: function () {
		var ret = Object.create(proto);
		return ret;
		},
	};

}());
