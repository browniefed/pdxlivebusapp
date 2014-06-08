var trimet = (function() {

	var baseUrl = window.ENV.baseUrl,
		stopUrl = url = baseUrl + 'findStops/';

	function searchForStops(ll) {
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