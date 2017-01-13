var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("app listening at http://%s:%s", host, port)
})