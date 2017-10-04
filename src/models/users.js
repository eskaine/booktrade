'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = Number(process.env.SALT_ROUNDS);

var User = new Schema({
  name: String,
  email: String,
  password: String,
  address: {
    city: String,
    state: String
  },
  books: [Schema.Types.Mixed]
});

module.exports = mongoose.model('User', User);
