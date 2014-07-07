/**
 * @jsx React.DOM
 */

var React = require('react');
var AppActions = require('../actions/app_actions');

var NearbyStop = React.createClass({

	toggleFavorite: function(route) {
		AppActions.togleFavorite({
			locid: this.props.nearbyStop.locid,
			route: route.route
		});
	},

	render: function() {
		var nearbyStopRoutes = this.props.nearbyStop.routes.map(function(route) {
			return (
				<li onClick={this.toggleFavorite.bind(this, route)}>
					{route.route}
				</li>
			)
		}.bind(this));
		return (
			<li>
				<h3>{this.props.nearbyStop.desc}</h3>
				<ul>
					{nearbyStopRoutes}
				</ul>
			</li>
		);
	}

});

module.exports = NearbyStop;