var user = (function() {
	
	var namespace = window.localStorage.userDefaults;

	function loadDefaults() {
		return {};
	}

	function saveDefaults(userDefaults) {
		window.localStorage.userDefaults = userDefaults;
	}

	function getFavorites() {
		return (this.loadDefaults() || {}).favorites;
	}

	function getUserLocation(cb) {
		navigator.geolocation.getCurrentPosition(cb);
	}

	function addFavoriteStop(stopId) {
		namespace.favoriteStops = namespace.favoriteStops || [];
	}

	function setupDefaults() {
		window.localStorage.userDefaults = window.localStorage.userDefaults || {};
	}


	setupDefaults()


	return {
		loadDefaults: loadDefaults,
		saveDefaults: saveDefaults,
		getFavorites: getFavorites,
		getUserLocation: getUserLocation
	};

}());