var trimet = (function() {

	var baseUrl = window.ENV.baseUrl,
		stopUrl = url = baseUrl + 'findStops/';

	function searchForStops(ll) {
		ll = '-122.64814188365399,45.53894041419389';
		return $.ajax({
			url: stopUrl + ll,
        	crossDomain: true,
        	dataType: 'json'
		});
	}

	return {
		searchForStops: searchForStops
	};
}())