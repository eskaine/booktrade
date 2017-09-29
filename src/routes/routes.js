'use strict';

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');


/*
var Redux = require('redux');
var Provider = require('react-redux').Provider;

function reducer(state) {
  return state;
};*/

var App = require('../containers/app.jsx');

const routes = ['/', '/signup', '/login'];

module.exports = function(app, passport) {

  app.route('*').get(function(req, res) {

    /*
    var state = {
      title: 'React'
    };*/

  //  var store = Redux.createStore(reducer, state);

    routes.reduce(function(index, route) {

      ReactRouter.matchPath(req.url, {
        path: route,
        exact: true
      });
    });

    res.send(ReactDOMServer.renderToString(
  //    <Provider store={store}>
        <ReactRouter.StaticRouter context={{}} location={req.url}>
          <App/>
        </ReactRouter.StaticRouter>
//      </Provider>
    ));

  });

  app.route('/login')
  .post(passport.authenticate('login', {}));

  app.route('/signup')
  .post(passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  })/*, function(req, res) {
    console.log(req.body);
    console.log(req);
  }*/);

};
