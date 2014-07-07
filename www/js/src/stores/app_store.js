var AppDispatcher = require('../dispatchers/app_dispatcher');
var AppConstants = require('../constants/app_constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;


var CHANGE_EVENT = 'change';
var db = window.localStorage;

var nearbyStops = [
	{
		locid: 635,
		desc: '24th & Broadway',
		routes: [
			{route: 17},
			{route: 77},
			{route: 70}
		]
	}


]

//MOVE THIS STUFF INTO A STORE? A UTILITY ? I DO NOT KNOW
function _toggleFavorite(favorite) {
	if (_isFavorite(favorite)) {
		_removeFavorite(favorite);
	} else {
		_addFavorite(favorite);
	}
}

function _loadNearbyStops() {

}
function getNearbyStops() {
	return nearbyStops;
}
function _isFavorite(favorite) {	
	return getFavoriteIndex(favorite) < 0;
}

function _addFavorite(favorite) {
	var favorites = getFavorites();
	
	favorite.push(favorite);

	setFavorites(favorites);
}

function _removeFavorite(favorite) {
	var favoriteIndex = getFavoriteIndex(favorite),
		favorites = getFavorites();
		
	favorites.splice(favoriteIndex, 1);

	setFavorites(favorites);
}


function getFavoriteIndex(favorite) {
	var favorites = getFavorites(),
		favoriteIndex = -1;

	favorites.forEach(function(fav, index) {
		if (favorite.locid == fav.locid && favorite.route == fav.route) {
			favoriteIndex = index;
		}
	});

	return favoriteIndex;	
}

function getFavorites() {
	return getPath('favorites') || [];
}
function setFavorites(data) {
	return setPath('favorites', data);
}

function getPath(path) {
	return JSON.parse(db.getItem(path));
}
function setPath(path, data) {
	return db.setItem(path, JSON.stringify(data));
}

var AppStore = merge(EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	getFavorites: getFavorites,
	getNearbyStops: getNearbyStops,
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: AppDispatcher.register(function(payload) {
		var action = payload.action;

		switch(action.actionType) {
			case AppConstants.TOGGLE_FAVORITE:
				_toggleFavorite(payload.action.favorite);
				break;
			case AppConstants.LOAD_NEARBY_STOPS:
				_loadNearbyStops();
				break;
		}

		AppStore.emitChange();

		return true;
	})
});

module.exports = AppStore;