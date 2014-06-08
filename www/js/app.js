var app = (function(map, connect, user, trimet) {

	var ractive,
		TYPES = {
			VEHICLE: 'vehicle',
			ROUTE: 'route'
		}

	function initialize() {
		// connect.connect(connectionUpdates);
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

		attachRactiveListeners();
	}

	function attachRactiveListeners() {
		ractive && ractive.on({
			toggleMap: function() {},
			searchVehicle: function() {},
			addFavoriteStop: function() {},
			openSearch: function(e) {
				this.toggle('searchVisible');
			},
			searchForStops: searchForStops,
			showNearbyStops: searchForStops,
			favoriteStop: function(e) {
				user.addFavoriteStop(e.context.locid);
			}
		})
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
		if (ractive) {
			var vehicles = ractive.get('vehicles.' + vehicle.vehicleID, vehicle);
		}
	}

	function setMapToViewport() {
		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}

	function searchForStops(e) {
		e.original.preventDefault();
		ractive.set('showNearbyStops', true);
		ractive.set('nearbyStops', []);
		user.getUserLocation(function(position) {
			trimet.searchForStops(position.coords.longitude + ',' + position.coords.latitude, function(stops) {
				ractive.set('nearbyStops', stops);
			});
		}, function(error) {
			 alert('code: '    + error.code  + 'message: ' + error.message);
		})
	}

	return {
		initialize: initialize
	}

}(map, connect, user, trimet));

document.addEventListener('deviceready', app.initialize, false);
