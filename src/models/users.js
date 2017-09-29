'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = Number(process.env.SALT_ROUNDS);

var User = new Schema({
    name: String,
    email: String,
    password: String,
    address :{
      city: String,
      state: String
    },
    books: [Schema.Types.Mixed]
});

User.methods = {

  hashPassword: function(password) {
    return new Promise(function(resolve, reject){
      bcrypt.hash(password, salt).then(function(hash){
        resolve(hash);
      });
    });
  },

  verifyPassword: function(password) {
    bcrypt.compare(password, this.password).then( function(res){
      
      console.log(res);
    });
  }
}

module.exports = mongoose.model('User', User);
