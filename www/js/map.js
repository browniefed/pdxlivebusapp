var map = (function() {

//THIS SHOULD JUST BE A RACTIVE COMPONENT!
	var map;

	function updateMarker() {

	}

	function addMarker() {

	}

	function removeMarker() {

	}

	function renderMap() {

	}



	return Ractive.extend({
		template: 'mapTemplate',
		init: function() {
			this.observe('markers', this.manageMarkers);
		},
		manageMarkers: function(newValue, oldValue, keypath) {
			//manage the markers here 
		}
	});
}());