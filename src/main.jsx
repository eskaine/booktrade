
require('./css/sticky-footer-navbar.css');
require('./css/styles.scss');

var React = require('react');
var ReactDOM = require('react-dom');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var App = require('./containers/app.jsx');
//var Redux = require('redux');
//var Provider = require('react-redux').Provider;
/*
function reducer(state) {
  return state;
};*/

//var props = window.PROPS;

ReactDOM.render(
  <BrowserRouter>
  <App/>
</BrowserRouter>, document);
