var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendfile('public/index.htm')
})


var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
