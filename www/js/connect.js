var connect = (function() {

	var cb,
		socketUrl = 'http://pdxlivebus.herokuapp.com/',
		socket;

	function connect(fn) {
		this.disconnect();
		socket = io(socketUrl);
		cb = fn || function() {};

		socket.on('connect', function() {
			cb('connect', 'success', socket);
		});

		socket.on('connect_error', function() {
			cb('connect', 'error', socket)
		});
		socket.on('disconnect', function() {
			cb('disconnect', 'success', socket);
		});
	}

	function registerForVehicles(fn) {
		socket && socket.on('vehicle', fn);
	}

	function disconnect() {
		socket && socket.disconnect();
		socket = null;
	}

	function registerRoom(room) {
		return socket && socket.emit('registerRoom', room)
	}

	function unregisterRoom(room) {
		socket && socket.emit('leaveRoom', room);
	}

	function unregisterAllRooms() {
		socket && socket.emit('leaveAllRooms', room);
	}

	function isDisconnected() {
		return socket && socket.disconnected;
	}

	return {
		connect: connect,
		disconnect: disconnect,
		registerRoom: registerRoom,
		unregisterRoom: unregisterRoom,
		registerForVehicles: registerForVehicles,
		unregistreAllRooms: unregisterAllRooms
	};
}());