//load our dependencies
var express = require('express');
var util = require('util');

//load all of our routers
var fact = require('./routes/fact');

//load our config module
var config = require('./config');

//Connect to database
config.mongoConnect();

//Set up our express server
var app = express();
var port = process.env.PORT || config.server.port;
app.listen(port,config.server.host,function(err){
  if (err) throw err;
  util.log(`Express server listening on ${config.server.host}:${port}`);
});

//Set up our middleware
app.use('/', function(req,res,next){
  res.on('finish',function(){
    util.log(`${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});
app.use('/api/fact',fact);
app.use('/', express.static(__dirname + '/public'));


