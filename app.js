//load our dependencies
var express = require('express');
var util = require('util');

//load all of our routers
var fact = require('./routes/fact');

//load all of our controllers
var dbConnectController = require('./controllers/dbConnectController');

//Connect to database
dbConnectController.connect();

//Set up our express server
var app = express();
var port = process.env.PORT || 1337;
app.listen(port,function(err){
  if (err) throw err;
  util.log(`Express server listening on ${port}`);
});

//Set up our middleware
app.use('/api/fact',fact);
app.use('/',function(req,res,next){
  util.log(`${req.method} ${req.url}`);
  next();
});
app.use('/', express.static(__dirname + '/public'));

