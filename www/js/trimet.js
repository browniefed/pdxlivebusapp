var trimet = (function() {

	var baseUrl = window.ENV.baseUrl;

	function searchForStops(ll, cb) {
		var url = baseUrl + 'findStops/' + ll;
		$.ajax({
			url: url,
        	crossDomain: true,
        	dataType: 'json',
			success: cb,
			error: function(err) {
				alert(err);
			}
		});
	}

	return {
		searchForStops: searchForStops
	};
}())