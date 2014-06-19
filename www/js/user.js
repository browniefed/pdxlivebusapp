var user = (function() {
	return function() {
		var db = window.localStorage;

		function loadDefaults() {
			return {
				favoriteStops: getFavorites(),
				stopList: stopList
			}
		}

		function getFavorites() {
			return getPath('favorites') || [];
		}
		function setFavorites(data) {
			return setPath('favorites', data);
		}

		function deleteStop(stopId, route) {
			var spliceIndex = hasStop(stopId, route),
				favorites = getFavorites();
			if (typeof spliceIndex === 'number') {
				favorites.splice(spliceIndex, 1);
				setFavorites(favorites);
			}
		}

		function addFavoriteStop(stopId, route) {
			var favorites = getFavorites(),
				stopIndex = hasStop(stopId, route);

			if (typeof stopIndex != 'number') {
				favorites.push(newFavorite(stopId, route));
				setFavorites(favorites)
			}
		}

		function getUserLocation() {
			var promise = $.Deferred();
			// navigator.geolocation.getCurrentPosition(function(position) {
			// 	promise.resolve(position);
			// }, function(err) {
			// 	promise.reject(err);
			// }, {maximumAge: 0, timeout:10000, enableHighAccuracy: false});
			promise.resolve({
				coords: {
					longitude: -122.63924639999999,
					latitude: 45.532004699999995
				}
			})
			return promise;
		}

		

		function newFavorite(stopId, route) {
			return {
				stopId: stopId,
				route: route
			};
		}

		function hasStop(stopId, route) {
			var favorites = getFavorites(),
				stopIndex;

			favorites.forEach(function(favorite, index) {
				if (favorite.stopId == stopId && favorite.route == route) {
					stopIndex = index;
				}
			});
			return stopIndex;		
		}

		function getPath(path) {
			return JSON.parse(db.getItem(path));
		}
		function setPath(path, data) {
			return db.setItem(path, JSON.stringify(data));
		}


		return {
			loadDefaults: loadDefaults,
			getUserLocation: getUserLocation,
			getFavorites: getFavorites,
			addFavoriteStop: addFavoriteStop,
			deleteStop: deleteStop
		};
	}
}());