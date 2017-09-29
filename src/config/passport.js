'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');


module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {

    User.findOne({
      email: email
    }, function(err, user) {
      if (err)
        return done(err);

      user.verifyPassword(password);
    });
  }));

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {

    User.findOne({
      email: email
    }, function(err, user) {
      if (err)
        return done(err);

      if (!user) {
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.hashPassword(password).then(function fulfilled(hash) {
          newUser.password = hash;
          newUser.save(function(err) {
            if (err)
              return done(err);
            return done(null, newUser);
          });
        });

      } else {
        return done(null, user);
      }
      //r
      /*


      if (!user.verifyPassword(password))
        return done(null, false);*/

    });
  }));

}
