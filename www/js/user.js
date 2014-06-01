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


	return {
		loadDefaults: loadDefaults,
		saveDefaults: saveDefaults,
		getFavorites: getFavorites
	};

}());