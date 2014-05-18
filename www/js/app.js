var app = (function(map, connect, user) {

	var ractive;

	function initialize() {
		connect.connect(updateVehciles);
		render(user.loadDefaults());
	}

	function render(data) {
		ractive = new Ractive({
			el: 'body', 
			template: 'appTemplate',
			data: data,
			components: {
				map: map
			}
		});
	}

	function updateVehciles() {

	}


	return {
		initialize: initialize
	}

}(map, connect, user));


document.addEventListener('deviceready', app.initialize, false);
