'use strict';

var User = require('../models/users.js');
var request = require('request');
var shortid = require('shortid');
var Book = require('../models/books');

function BookHandler() {

  this.displayMyBooks = function(req, res) {
    Book.aggregate([
      {$match: {"owner_id": String(req.user._id)}},
      {$sort: {title: 1}},
      {$project: {id: "$_id", _id: 0,imageUrl: 1, request_from: 1}},
      {$group: {
        _id: 0,
        books: {$push: {id: "$_id" ,imageUrl: "$imageUrl"}},
        approvals_count: {
          $sum: {$cond: [{$ifNull: ["$request_from", false]}, 1, 0]}
        }
      }}
    ]).exec(function(err, result) {
      if (err)
        throw err;

      if (result.length > 0) {
        req.session.renderParams.books = result[0].books;
        req.session.renderParams.approvals = result[0].approvals_count;
      }
      req.session.renderParams.active = req.url;
      res.render('mybooks.pug', req.session.renderParams);
    });
  }

  this.displayAllBooks = function(req, res) {
    Book.aggregate([
      {$match: {
        $or: [{request_from: {$exists: false}}, {request_from: {$eq: [null]}}]
      }},
      {$project: {_id: 1, owner_id: 1, title: 1, imageUrl: 1}},
      {$sort: {title: 1}},
      {$project: {
        _id: 1,
        imageUrl: 1,
        isOwner: {
          $cond: [{$eq: ["$owner_id", String(req.user._id)]}, 1, 0]
        }
      }}
    ]).exec(function(err, result) {
      if (err)
        throw err;
      req.session.renderParams.books = result;
      req.session.renderParams.active = req.url;
      res.render('allbooks.pug', req.session.renderParams);
    });
  }

  this.queryBook = function(req, res) {
    var googleUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var queryParams = "&maxResults=1&projection=lite&key=" + process.env.GOOGLE_BOOKS_API_KEY;
    var url = googleUrl + req.body.book + queryParams;

    request(url, function(error, respond, body) {
      if (error)
        throw error;

      if (body) {
        body = JSON.parse(body);

        var newBook = new Book();
        newBook._id = shortid.generate();
        newBook.title = body.items[0].volumeInfo.title;
        newBook.imageUrl = body.items[0].volumeInfo.imageLinks.smallThumbnail;
        newBook.owner_id = req.user._id;
        newBook.save(function(err) {
          if (err)
            return err;

          res.redirect('/mybooks');
        });
      }
    });
  }

  this.removeBook = function(req, res) {
    Book.remove({_id: req.body.id}).exec(function(err, result) {
      if (err)
        throw err;

      res.send(true);
    });
  }

  this.requestBook = function(req, res) {
    Book.findOne({_id: req.body.book_id}).exec(function(err, result) {
      if (err)
        throw err;

      //check if book is already requested for by another use
      if (!result.request_from) {
        Book.update({_id: req.body.book_id}, {request_from: req.user._id}).exec(function(updateErr, updateResult) {
          if (updateErr)
            throw updateErr;

          //update user requests list
          User.findOneAndUpdate(
            {email: req.user.email},
            {$push: {requestsFor: req.body.book_id}},
            {projection: {_id: 0, requestsFor: 1}, new: true}
          ).exec(function(userErr, userResult) {
            if (userErr)
              throw userErr;
            req.session.renderParams.requests = userResult.requestsFor.length;
            res.send({totalRequests: userResult.requestsFor.length});
          });
        });
      }

    });
  }

  this.requestList = function(req, res) {
    var cursor = Book.find({request_from: String(req.user._id)}, {_id: 1, imageUrl: 1});
    cursor.sort({title: 1})
    .exec(function(err, result) {
      if (err)
        throw err;

      res.send(result);
    });
  }

  this.deleteRequest = function(req, res) {
    console.log(req.body);
  }

}

module.exports = BookHandler;
