var map = (function() {

	var map;

	function updateMarker() {

	}

	function addMarker() {

	}

	function removeMarker() {

	}

	function renderMap(el) {
		setMapToViewport(el);

		map = L.map(el).setView([51.505, -0.09], 13);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);


	}

	function setMapToViewport(el) {
		el.style.width = window.innerWidth + 'px';
		el.style.height = window.innerHeight + 'px';
	}

	return Ractive.extend({
		template: '#mapTemplate',
		init: function() {
			renderMap(this.el.querySelector('.map'));
			this.observe('markers', this.manageMarkers);
		},
		manageMarkers: function(newValue, oldValue, keypath) {
			//manage the markers here 
		}
	});
}());