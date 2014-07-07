/**
 * @jsx React.DOM
 */

var React = require('react'),
	FavoriteStopsList = require('./favorite_stops_list');

var FavoriteStops = React.createClass({

	render: function() {
		return (
			<div className="favorite-stop-container">
				<FavoriteStopsList favoriteStops={this.props.favoriteStops} vehicles={this.props.vehicles} />
			</div>
		);
	}

});

module.exports = FavoriteStops;