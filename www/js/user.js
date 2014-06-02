var user = (function() {
	
	function loadDefaults() {
		return window.localStorage.userDefaults
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

	return {
		loadDefaults: loadDefaults,
		saveDefaults: saveDefaults,
		getFavorites: getFavorites,
		getUserLocation: getUserLocation
	};

}());