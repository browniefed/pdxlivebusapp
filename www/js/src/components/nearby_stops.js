/**
 * @jsx React.DOM
 */

var React = require('react');
var NearbyStopsList = require('./nearby_stops_list');

var NearbyStops = React.createClass({

	render: function() {
		return (
			<div className="nearby-stop-container">
				<NearbyStopsList nearbyStops={this.props.nearbyStops} />
			</div>
		);
	}

});

module.exports = NearbyStops;