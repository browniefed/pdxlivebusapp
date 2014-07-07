/**
 * @jsx React.DOM
 */

var React = require('react');

var StopCard = React.createClass({

	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

});

module.exports = StopCard;