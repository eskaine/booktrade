'use strict';

var express = require('express');
var routes = require('./app/routes/routes.js');

var app = express();
require('dotenv').load();

routes(app);




var port = process.env.PORT;
app.listen(port, function(){
  console.log('Server initialize. Listening on port ' + port + ' ...');
});
