'use strict';

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');

var App = require('../containers/app.jsx');

const routes = ['/', '/signup', '/login'];

module.exports = function(app) {

  app.route('*').get(function(req, res) {
    var props = {
      title: 'React'
    };

    routes.reduce(function(index, route) {


      ReactRouter.matchPath(req.url, {
        path: route,
        exact: true
      });
    });

    res.send(ReactDOMServer.renderToString(
      <ReactRouter.StaticRouter context={{}} location={req.url}>
        <App />
      </ReactRouter.StaticRouter>
    ));

  });

  /*
  app.route('/').get(function (req, res){

    var props = {title: 'React'};
    var index = ReactDOMServer.renderToString(React.createElement(App, props));
    res.send(index);
  });

  app.route('/signup').get(function (req, res){
    var signup = ReactDOMServer.renderToString(React.createElement(App));
    res.send(signup);
  });

  app.route('/login').get(function (req, res){

  });
*/
};
