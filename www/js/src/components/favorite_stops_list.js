/**
 * @jsx React.DOM
 */

var React = require('react'),
	FavoriteStop = require('./favorite_stop');

var FavoriteStopsLis = React.createClass({
	getDefaultProps: function() {
		return {
			vehicles: {},
			favoriteStops: []
		};
	},
	getVehicle: function(favoriteStop) {
		var stopVehicles = this.props.vehicles[favoriteStop.locid] || {};
		return stopVehicles[favoriteStop.route] || {};
		
	},
	render: function() {

		var favoriteStops = this.props.favoriteStops.map(function(favoriteStop) {
			return (<FavoriteStop favoriteStop={favoriteStop} vehicle={this.getVehicle(favoriteStop)} />);
		}.bind(this));
		
		return (
			<ul className="favorite-stops-list">
				{favoriteStops}
			</ul>
		);
	}

});

module.exports = FavoriteStopsLis;