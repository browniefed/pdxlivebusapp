var app = (function(map, connect, user) {

	var ractive;

	function initialize() {
		connect.connect(updateVehciles);
		render(user.loadDefaults());
	}

	function render(data) {
		debugger;
		ractive = new Ractive({
			el: 'body', 
			template: '#appTemplate',
			data: data,
			components: {
				Map: map
			}
		});
	}

	function updateVehciles() {

	}

	function setMapToViewport() {

		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}
	return {
		initialize: initialize
	}

}(map, connect, user));

document.addEventListener('deviceready', app.initialize, false);
