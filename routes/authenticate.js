var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


router.get('/',function(req,res,next) {
    res.redirect('/');
})

router.post('/login',jsonParser, function(req, res, next) {
    var count = 1;
    var u = req.body.u;
    var p = req.body.p;
   user.findOne({'email' : u, "hash" : p},function (err, user) {
    if (err) return next(err);
    if (user != null) {
    res.send(user.key);
    } else {
        res.send("https://www.youtube.com/watch?v=cQ_b4_lw0Gg");
    }
  });
});




module.exports = router;
