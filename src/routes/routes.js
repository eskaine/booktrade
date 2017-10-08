'use strict';

var BookHandler = require('../handlers/bookHandler.js');
var ProfileHandler = require('../handlers/profileHandler.js')

module.exports = function(app, passport) {

  var bookHandler = new BookHandler();
  var profileHandler = new ProfileHandler();

  function createAuthRenderSession(req) {
    if(!req.session.renderParams) {
      req.session.renderParams = {
        active: req.url,
        isAuthenticated: req.isAuthenticated(),
        username: req.user.name,
        books: [],
        requests: req.user.requestsFor.length,
        approvals: 0
      }
    }
  }

  function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
      createAuthRenderSession(req);
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
    console.log(req.session);
    var params = {
      active: '/'
    };

    if (req.isAuthenticated()) {
      req.session.renderParams.active = req.url;
      params = req.session.renderParams;
    }
    res.render('index.pug', params);
  });

  app.route('/login').get(alreadyLogged, function(req, res) {
    res.render('auth.pug', {
      active: req.url,
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
      active: req.url,
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

  app.route('/mybooks').get(isLogged, bookHandler.displayMyBooks);

  app.route('/allbooks').get(isLogged, bookHandler.displayAllBooks);

  app.route('/profile')
  .get(isLogged, profileHandler.getProfile)
  .post(profileHandler.updateProfile);

  app.route('/password')
  .post(profileHandler.updatePassword);

  //send a trade request
  app.route('/request').post(bookHandler.requestBook);

  //query book from Google, add to my books
  app.route('/add').post(bookHandler.queryBook);

  //remove a book from my books
  app.route('/remove').post(bookHandler.removeBook);

  //get list of trade requests
  app.route('/requestList').get(bookHandler.requestList)
  //delete a trade request
  .post(bookHandler.deleteRequest);

  app.route('/logout').get(function(req, res) {
    delete req.session.renderParams;
    req.logout();
    res.redirect('/');
  });

  app.route('*').get(function(req, res){
    res.redirect('/');
  });

};
