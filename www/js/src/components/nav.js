/**
 * @jsx React.DOM
 */

var React = require('react');

var Nav = React.createClass({

	changeView: function(id) {
		this.props.changeViewHandler(id);
	},

	render: function() {
		var navs = [],
			nav;

		for(var view in this.props.views) {
			var nav = (
				<li>
					<a href="#" onClick={this.changeView.bind(this, this.props.views[view].id)}>{this.props.views[view].label}</a>
				</li>
			)
			navs.push(nav);
		}
		return (
			<ul>
				{navs}
			</ul>
		);
	}

});

module.exports = Nav;