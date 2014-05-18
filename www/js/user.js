var user = (function() {
	
	function loadDefaults() {
		return window.localStorage.userDefaults
	}

	function saveDefaults(userDefaults) {
		window.localStorage.userDefaults = userDefaults;
	}


	return {
		loadDefaults: loadDefaults,
		saveDefaults: saveDefaults
	};

}());