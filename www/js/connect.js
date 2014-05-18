var connect = (function() {

	var cb;

	function connect(fn) {
		cb = fn;
	}

	function disconnect() {

	}

	return {
		connect: connect,
		disconnect: disconnect
	};
}());