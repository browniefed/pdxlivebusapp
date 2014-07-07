/**
 * @jsx React.DOM
 */
 var React = require('react'),
 	 FavoriteStops = require('./favorite_stops'),
 	 NearbyStops = require('./nearby_stops'),
 	 Nav = require('./nav.js'),
 	 AppStore = require('../stores/app_store');

var Views = {
	FAVORITE_STOPS: {label: 'Favorite Stops', id: 1},
	NEARBY_STOPS: {label: 'Nearby Stops', id: 2}
};

var CURRENT_VIEW = Views.FAVORITE_STOPS;

var App = React.createClass({
 	getDefaultProps: function() {
 		//Get initial favorite stops and such
 		return {
 			favoriteStops: [],
 			vehicles: {},
 			nearbyStops: AppStore.getNearbyStops()
 		};
 	},
 	getView: function() {
 		if (this.state.CURRENT_VIEW == Views.FAVORITE_STOPS.id) {
 			return (
 				<FavoriteStops favoriteStops={this.props.favoriteStops} vehicles={this.props.vehicles} />
 			)
 		} else if (this.state.CURRENT_VIEW == Views.NEARBY_STOPS.id) {
 			return (
 				<NearbyStops nearbyStops={this.props.nearbyStops} favoriteStops={this.props.favoriteStops} />
 			)
 		}
 	},
 	getInitialState: function() {
 		return {
 			CURRENT_VIEW: CURRENT_VIEW.id
 		};
 	},
 	componentWillMount: function() {
 		//INIT WEB SOCKETS!
 		AppStore.addChangeListener(this._onChange);
 	},
 	_onChange: function() {
 		this.setProps({
 			favorites: AppStore.getFavorites()
 		})
 	},
 	changeViewHandler: function(view) {
 		if (view != this.state.CURRENT_VIEW) {
 			this.setState({CURRENT_VIEW: view});
 		}
 	},
 	render: function() {
 		var view = this.getView();
 		return (
 			<div>
 				<Nav views={Views} currentView={this.state.CURRENT_VIEW} changeViewHandler={this.changeViewHandler} />
	 			<div className="app-items-container">
	 				{view}
	 			</div>
	 		</div>
 		);
 	}

});

module.exports = App;