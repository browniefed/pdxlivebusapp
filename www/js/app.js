var app = (function(map, connect, user) {

	var ractive,
		TYPES = {
			VEHICLE: 'vehicle',
			ROUTE: 'route'
		}

	function initialize() {
		connect.connect(connectionUpdates);
		render(user.loadDefaults());
	}

	function render(data) {
		ractive = new Ractive({
			el: 'body', 
			template: '#appTemplate',
			data: data,
			components: {
				Map: map
			}
		});
	}

	function connectionUpdates(event, msg, socket) {
		if (event == 'disconnect') {
			connect.disconnect();
			connect.connect(function() {});
		} else if(event == 'connect') {
			connect.registerForVehicles(handleVehicleUpdates);
			if (user.getFavorites()) {
				user.getFavorites().forEach(function(favorite) {
					//This can be simplified and made smarter
					if (favorite.type == TYPES.VEHICLE) {
						connect.registerRoom('v' + favorite.id);
					} else if (favorite.type == TYPES.ROUTE) {
						connect.registerRoom('r' + favorite.id);
					}
				})
			}

			//get user preference and register the specific rooms/busses
		} else if (event == 'connect_error') {
			//Shit went bad - try to reconnect?
		}
	}

	function handleVehicleUpdates(vehicle) {

	}

	function setMapToViewport() {

		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}
	return {
		initialize: initialize
	}

}(map, connect, user));

function loadSockets() {
	app.initialize();
}

document.addEventListener('deviceready', loadSockets, false);
