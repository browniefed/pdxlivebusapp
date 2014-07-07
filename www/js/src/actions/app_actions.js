var AppConstants = require('../constants/app_constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var AppActions = {

	toggleFavorite: function(favorite) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.TOGGLE_FAVORITE,
			favorite: favorite
		})
	}
};


module.exports = AppActions;