'use strict';

var User = require('../models/users.js');
var request = require('request');

function BookHandler() {

  var googleUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var queryParams = "&maxResults=1&projection=lite&key=" + process.env.GOOGLE_BOOKS_API_KEY;

  this.queryBook = function(req, res) {
    var url = googleUrl + req.body.book + queryParams;

    request(url, function(error, respond, body) {
      if (error)
        throw error;

      if (body)
        body = JSON.parse(body);

      var book = {
        title: body.items[0].volumeInfo.title,
        imageUrl: body.items[0].volumeInfo.imageLinks.smallThumbnail
      };

      User.findOneAndUpdate({email: req.user.email}, {$push: {books: book}})
        .exec(function(err, result) {
          res.redirect('/mybooks');
        });
        
    });
  }

  this.displayMyBooks = function(req, res) {
    User.find({email: req.user.email}, {books: 1, _id: 0})
      .exec(function(err, result) {
        res.render('mybooks.pug', {
          name: req.user.name,
          books: result[0].books
        });
      });
  }

}

module.exports = BookHandler;
