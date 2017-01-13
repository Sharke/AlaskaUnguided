var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fact = require('../models/fact.js');
/* GET /todos listing. */
router.get('/', function(req, res, next) {
  fact.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

router.post('/', function(req, res, next) {
  fact.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  fact.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  fact.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  fact.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;
