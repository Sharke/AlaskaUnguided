var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Starting express server on port ' + port);
});