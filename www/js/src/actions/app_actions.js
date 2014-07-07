var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatchers/app_dispatcher');


var AppActions = {

	toggleFavorite: function(favorite) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.TOGGLE_FAVORITE,
			favorite: favorite
		})
	},
	loadNearbyStops: function() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.LOAD_NEARBY_STOPS
		})
	}
};


module.exports = AppActions;