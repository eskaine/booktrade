'use strict';

require('babel-register')({
  presets: ['react']
});

var path = process.cwd();
var express = require('express');

//router
//var app = require('express').Router();
var routes = require('./src/routes/routes.js');



var app = express();


require('dotenv').load();


app.use('/css', express.static(path + '/public/css'));
app.use('/js', express.static(path + '/public/js'));

routes(app);




var port = process.env.PORT;
app.listen(port, function(){
  console.log('Server initialize. Listening on port ' + port + ' ...');
});
