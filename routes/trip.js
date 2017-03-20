var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var trip = require('../models/trip.js');
/* GET /todos listing. */
router.get('/search', function(req, res, next) {
    var count = 1;
    var cost = req.query.cost;
    var keyWord = req.query.keyword;
    var type = req.query.type;
    var startDate = new Date(req.query.start).getTime() / 1000;
    var endDate = new Date(req.query.end).getTime() / 1000;
    var random = req.query.random;
    var countParam = req.query.count;
    var recommended = req.query.recommended
    if (parseInt(countParam) > 0) {
      count = parseInt(countParam);
    }

    if (random == null) {
      random = 'false';
    }

    if (cost == null) {
      cost = 3;
    }

    if (recommended == null) {
      recommended = 'false';
    }

    if (type == null) {
      type = '';
    }

    if (startDate.toString() == 'NaN') {
      startDate = "999999999999";
    }

    if (random == 'true') {
      trip.findRandom({}, {}, {limit: count}, function(err, post){
        if (err) return next(err);
        res.send(post);
      })
    } else {
    if (recommended == 'true') {
    trip.find({'name':new RegExp(keyWord, "i"),'cost':{$lte: cost},'activities.sub_activities.best_time_start': {$lte : parseInt(startDate)}, 'destination.type' :new RegExp(type, "i"), 'recommended' : true },function (err, myTrip) {
    if (err) return next(err);
    res.send(myTrip);
  });
      } else {
   trip.find({'name':new RegExp(keyWord, "i"),'cost':{$lte: cost},'activities.sub_activities.best_time_start': {$lte : parseInt(startDate)}, 'destination.type' :new RegExp(type, "i") },function (err, myTrip) {
    if (err) return next(err);
    res.send(myTrip);
  });}}
});

router.get('/search/:id', function(req, res, next) {
trip.findById(req.params.id, function(err,data){
  res.send(data);
});
});

module.exports = router;
