/**
 * @jsx React.DOM
 */

var React = require('react');

var FavoriteStop = React.createClass({

	render: function() {
		return (
			<li>
				<StopCard favoriteStop={this.props.favoireStop} vehicle={this.props.vehicle}>
					{this.props.vehicle.estimated}
				</StopCard>

			</li>
		);
	}

});

module.exports = FavoriteStop;