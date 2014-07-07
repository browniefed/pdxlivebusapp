/**
 * @jsx React.DOM
 */

 var React = require('react'),
 	 App = require('./components/app');

 function render(el) {
 	React.renderComponent(<App />, el);
 }

 global.window.initApp = render;

 module.exports = render;