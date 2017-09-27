
require('./css/sticky-footer-navbar.css');

var ReactDOM = require('react-dom');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var App = require('./containers/app.jsx');

//var props = window.PROPS;

ReactDOM.render(
  <BrowserRouter>
  <App/>
</BrowserRouter>, document);
