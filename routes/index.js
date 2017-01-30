var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/', express.static(__dirname + '/../public'));
router.get('/', function(req, res) {
  res.sendfile('index.html',{"root": './public'});
});


module.exports = router;
