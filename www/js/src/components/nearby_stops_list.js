/**
 * @jsx React.DOM
 */

var React = require('react'),
	NearbyStop = require('./nearby_stop');

var NearbyStopsList = React.createClass({

	getDefaultProps: function() {
		return {
			nearbyStops: []
		};
	},
	render: function() {
		var nearbyStops = this.props.nearbyStops.map(function(nearbyStop) {
			return <NearbyStop nearbyStop={nearbyStop} />
		});
		return (
			<ul>
				{nearbyStops}
			</ul>
		);
	}

});

module.exports = NearbyStopsList;