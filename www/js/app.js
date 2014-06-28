var app = (function(map, connect, user, trimet) {

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

		data.favoriteStops = parseFavoriteStops(data.favoriteStops);

		data.circlePosition = function(stopIndex) {
			var div = 360/12;
	        var radius = 75;
	        var offsetToParentCenter = 100;
	        var offsetToChildrenCenter = 15;
	        var totalOffset = offsetToParentCenter - offsetToChildrenCenter;
	        var stop;
	    	var i = stopIndex + 1;
            var y = Math.sin( (div * i) * (Math.PI/180)) * radius;
            var x = Math.cos( (div * i) * (Math.PI/180)) * radius;

           	return 'left:' + (x + totalOffset) + 'px; top:' + (y + totalOffset) + 'px;';
		}
		data.getPreviousStops = function(route, stopId) {
			var dirs = [0,1],
				stops,
				locationIndex;
		_.each(dirs, function(dir) {
			if ( !(locationIndex >= 0)) {
				stops = routeConfig[route].dir[dir].stop;
				_.find(stops, function(stop, index) {
					if (stop.locid == stopId) {
						locationIndex = index;
						return true;
					}
				});
			}
		})			



			return stops.slice((locationIndex - 11 < 0 ? 0 : locationIndex  - 11), locationIndex + 1);
		}

		data.busAtStop = function(route, stopId) {
			return this.get('busPositionInfo.' + route + '.' + stopId + '.currentStop');
		}

		data.getCurrentBusStop = function(route, currentStopId) {
			var dirs = [0,1],
				stops,
				locationIndex,
				busPositionInfo = this.get('busPositionInfo'),
				stopId = this.get('busPositionInfo.' + route + '.' + currentStopId + '.currentStop');


			_.each(dirs, function(dir) {
				if ( !(locationIndex >= 0)) {
					stops = routeConfig[route].dir[dir].stop;
					_.find(stops, function(stop, index) {
						if (stop.locid == stopId) {
							locationIndex = index;
							return true;
						}
					});
				}
			});

			var stop = stops[locationIndex];
			if (stop) {
				return stop.desc + ' - ' + stop.locid;
			}
			return '';


		}

		data.getEstimatedTime = function(route, stopId) {
			var busPositionInfo = this.get('busPositionInfo');
			return moment(this.get('busPositionInfo.' + route + '.' + stopId + '.estimatedArrival')).format('MMMM Do YYYY, h:mm:ss a');
		}
		data.getInCongestion = function(route, stopId) {
			var busPositionInfo = this.get('busPositionInfo');
			return this.get('busPositionInfo.' + route + '.' + stopId + '.inCongestion');
		}
		data.getPassengerLoad = function(route, stopId) {
			var busPositionInfo = this.get('busPositionInfo');
			return this.get('busPositionInfo.' + route + '.' + stopId + '.loadPercentage');
		}
		data.getBusDelay = function(route, stopId) {
			var busPositionInfo = this.get('busPositionInfo');
			var delay = this.get('busPositionInfo.' + route + '.' + stopId + '.delay');
			if (delay == 0) {
				return 'bus is on time';
			} else if (delay < 0) {
				return 'bus is  ' + (delay * -1) + ' seconds late';
			} else if (delay > 0) {
				return 'bus is  ' + delay + ' seconds early';
			}
			return '';
		}

		data.busPositionInfo = {};

		ractive = new Ractive({
			el: 'body', 
			template: '#appTemplate',
			data: data,
			components: {
				Map: map
			}
		});
		window.ractive = ractive;

		attachRactiveListeners();
		
	}
	function parseFavoriteStops(stopArray) {
		var favorites = {};
		stopArray.forEach(function(stop) {
			favorites[stop.stopId] = favorites[stop.stopId] || {};
			favorites[stop.stopId][stop.route] = true;
		});
		return favorites;

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
				var stopId = this.get('nearbyStops.' + e.index.stopIndex + '.locid') + '',
					route = e.context.route + '',
					favoriteKeyPath = 'favoriteStops.' + stopId + '.' + route,
					favoriteStop = this.get(favoriteKeyPath);

				if (!favoriteStop) {
					user.addFavoriteStop(stopId, route);
				} else {
					user.deleteStop(stopId, route);
				}

				this.set('favoriteStops.' + stopId + '.' + route, !favoriteStop);
				e.original.preventDefault();
			},
			showFavorites: function() {
				this.set('showNearbyStops', false);
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
				var favoriteStops = parseFavoriteStops(user.getFavorites());
				_.each(favoriteStops, function(routes, stop) {
					_.each(routes, function(reg, route) {
						connect.registerRoom('s'+stop+'r'+route);
					});
				});
			}

			//get user preference and register the specific rooms/busses
		} else if (event == 'connect_error') {
			//Shit went bad - try to reconnect?
		}
	}

	function handleVehicleUpdates(vehicle) {
		if (ractive && vehicle && vehicle.route && vehicle.locid && vehicle.currentStop) {
			var busPositionInfo = ractive.get('busPositionInfo') || {};

				busPositionInfo[vehicle.route] = busPositionInfo[vehicle.route] || {};
				busPositionInfo[vehicle.route][vehicle.locid] = busPositionInfo[vehicle.route][vehicle.locid] || {};

				busPositionInfo[vehicle.route][vehicle.locid] = {
					currentStop: vehicle.currentStop,
					estimatedArrival: vehicle.estimated,
					loadPercentage: vehicle.loadPercentage,
					inCongestion: vehicle.inCongestion,
					delay: ((vehicle.vehicleInfo || {}).delay) || 0
				}

			ractive.set('busPositionInfo', {});
			ractive.set('busPositionInfo', busPositionInfo);
			ractive.update('busPositionInfo');
			console.log(busPositionInfo);
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
		var positionPromise = user.getUserLocation();

		positionPromise.done(function(position) {
			var stopsPromise = trimet.searchForStops(position.coords.longitude + ',' + position.coords.latitude) 

			stopsPromise.done(function(stops) {
				ractive.set('nearbyStops', stops);
			});

			stopsPromise.fail(function() {
				alert('Failed to get nearby stops');
			});

		});

		positionPromise.fail(function(error) {
			 alert('code: '    + error.code  + 'message: ' + error.message);
		});
	}

	return {
		initialize: initialize
	}

}(map, connect(), user(), trimet));

app.initialize();
document.addEventListener('deviceready', app.initialize, false);
