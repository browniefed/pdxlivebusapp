var trimet = (function() {

	var baseUrl = 'http://pdxlivebus.herokuapp.com/'

	function searchForStops(ll, cb) {
		superagent.get(baseUrl + 'findStops/' + ll).withCredentials().end(cb);
	}

	return {
		searchForStops: searchForStops
	};
}())