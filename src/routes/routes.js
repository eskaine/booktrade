'use strict';

var BookHandler = require('../handlers/bookHandler.js');
var ProfileHandler = require('../handlers/profileHandler.js')

module.exports = function(app, passport) {

  var bookHandler = new BookHandler();
  var profileHandler = new ProfileHandler();

  function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  function alreadyLogged(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/mybooks');
    } else {
      return next();
    }
  }

  app.route('/').get(function(req, res) {
    var name = null;
    if (req.user) {
      name = req.user.name
    }
    res.render('index.pug', {
      isAuthenticated: req.isAuthenticated(),
      name: name
    });
  });

  app.route('/login').get(alreadyLogged, function(req, res) {
    res.render('auth.pug', {
      path: req.url,
      title: "Login",
      buttonlabel: "Login",
      buttonclass: "btn-primary",
      button2label: "Sign Up",
      button2path: "/signup"
    });
  }).post(passport.authenticate('login', {
    successRedirect: '/mybooks',
    failureRedirect: '/login'
  }));

  app.route('/signup').get(alreadyLogged, function(req, res) {
    res.render('auth.pug', {
      path: req.url,
      title: "Sign Up",
      buttonlabel: "Create Account",
      buttonclass: "btn-success",
      button2label: "Login",
      button2path: "/login"
    });
  }).post(passport.authenticate('signup', {
    successRedirect: '/mybooks',
    failureRedirect: '/signup'
  }));

  app.route('/add').post(bookHandler.queryBook);

  app.route('/mybooks').get(isLogged, bookHandler.displayMyBooks);

  app.route('/profile')
  .get(isLogged, profileHandler.getProfile)
  .post(profileHandler.updateProfile);

  app.route('/password')
  .post(profileHandler.updatePassword);

  app.route('/logout').get(function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.route('*').get(function(req, res){
    res.redirect('/');
  });

};
