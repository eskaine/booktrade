'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  email: String,
  password: String,
  address: {
    city: String,
    state: String
  },
  requestsFor: [String]
});

module.exports = mongoose.model('User', User);
