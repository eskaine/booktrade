'use strict';

require('babel-register')({
  presets: ['react']
});

var path = process.cwd();
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var routes = require('./src/routes/routes.js');

var app = express();
require('dotenv').load();
require('./src/config/passport')(passport);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use('/css', express.static(path + '/public/css'));
app.use('/js', express.static(path + '/public/js'));

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Server initialize. Listening on port ' + port + ' ...');
});
