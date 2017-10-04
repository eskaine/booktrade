'use strict';

var User = require('../models/users.js');
var PasswordHandler = require('./passwordHandler.js');

function ProfileHandler() {
  var passwordHandler = new PasswordHandler();

  this.getProfile = function(req, res) {
    var city = null,
      state = null;

    if (req.user.address.city) {
      city = req.user.address.city;
    }

    if (req.user.address.state) {
      state = req.user.address.state;
    }

    res.render('profile.pug', {
      name: req.user.name,
      city: city,
      state: state
    });
  }

  this.updateProfile = function(req, res) {
    var profile = {
      name: req.body.name,
      address: {
        city: req.body.city,
        state: req.body.state
      }
    };

    User.findOneAndUpdate({
      email: req.user.email
    }, profile).exec(function(err, result) {
      if (err)
        throw err;
      console.log(result);
      res.redirect('/profile');
    });
  }

  this.updatePassword = function(req, res) {
    var oldPass = req.body['old-password'];
    var newPass = req.body['new-password'];

    passwordHandler.update(req.user.password, oldPass, newPass, function(hash) {
      User.findOneAndUpdate({
        email: req.user.email
      }, {password: hash}).exec(function(err, result) {
        res.redirect('/profile');
      });
    });
  }

}

module.exports = ProfileHandler;
