var express = require("express");
var _ = require('underscore')._;
var fs = require('fs');
var indexHTML = require('./backend/templater.js');
var app     = express();
var port = process.env.PORT || 8080;

app.use(express.bodyParser());

// ROUTES
    
app.get('/', function(req, res) {
  res.end(indexHTML.build());
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + "/"));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port);
console.log('Server running on port', port, '...');


