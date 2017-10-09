'use strict';

var BookHandler = require('../handlers/bookHandler.js');
var TradeHandler = require('../handlers/tradeHandler.js');
var ProfileHandler = require('../handlers/profileHandler.js')

module.exports = function(app, passport) {

  var bookHandler = new BookHandler();
  var tradeHandler = new TradeHandler();
  var profileHandler = new ProfileHandler();

  function createAuthRenderSession(req) {
    if(!req.session.renderParams) {
      req.session.renderParams = {
        active: req.url,
        isAuthenticated: req.isAuthenticated(),
        username: req.user.name,
        books: [],
        requests: req.user.requestsCount,
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
  .post(isLogged, profileHandler.updateProfile);

  app.route('/password').post(isLogged, profileHandler.updatePassword);

  //query book from Google, add to my books
  app.route('/add').post(isLogged, bookHandler.queryBook);

  app.route('/remove/:bookID').post(isLogged, bookHandler.removeBook);

  app.route('/requestList').get(isLogged, tradeHandler.requestList);

  app.route('/approvalList').get(isLogged, tradeHandler.approvalList);

  app.route('/request/:bookID').post(isLogged, tradeHandler.requestBook);

  app.route('/delete/:bookID').post(isLogged, tradeHandler.deleteRequest);

  app.route('/approve/:bookID').post(isLogged, tradeHandler.approveRequest);

  app.route('/reject/:bookID').post(isLogged, tradeHandler.deleteRequest);

  app.route('/logout').get(function(req, res) {
    delete req.session.renderParams;
    req.logout();
    res.redirect('/');
  });

  app.route('*').get(function(req, res){
    res.redirect('/');
  });

};
