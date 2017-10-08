'use strict';

var path = process.cwd();
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var routes = require('./src/routes/routes.js');

var app = express();
require('dotenv').load();
require('./src/handlers/passport')(passport);

app.set('views', path + '/public');
app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use('/css', express.static(path + '/public/css'));
app.use('/js', express.static(path + '/src/controllers'));
app.use('/ajax', express.static(path + '/src/common'));

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Server initialize. Listening on port ' + port + ' ...');
});
