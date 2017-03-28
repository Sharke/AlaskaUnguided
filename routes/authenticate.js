var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
/* GET /todos listing. */
router.post('/login',jsonParser, function(req, res, next) {
    var count = 1;
    var u = req.body.u;
    var p = req.body.p;
   console.log("Post Recieved" + " ");
   user.findOne({'email' : u, "hash" : p},function (err, user) {
    if (err) return next(err);
    res.send(user.key);
  });
});

router.get('/',function(req,res,next) {
    res.redirect('/');
})



module.exports = router;
