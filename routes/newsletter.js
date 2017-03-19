var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var email = require('../models/email');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/', function(req,res,next){
    res,redirect('/');
});

router.post('/',jsonParser,function(req,res,next){
    email.create(req.body,function(err,pos){
        if (err) return next(err);
        res.send(req.body);
    });
});

module.exports = router;