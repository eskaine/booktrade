'use strict';


module.exports = function(app) {

  app.route('/').get(function (req, res){
    res.sendFile(process.cwd() + '/public/index.html');
  });

  app.route('/signup').get(function (req, res){

  });

  app.rute('/login').get(function (req, res){

  });

};
