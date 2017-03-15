var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var trip = require('../models/trip.js');
/* GET /todos listing. */
router.get('/search', function(req, res, next) {
    var cost = req.query.cost;
    var keyWord = req.query.keyword;
    var type = req.query.type;
    var startDate = new Date(req.query.start).getTime() / 1000;
    var endDate = new Date(req.query.end).getTime() / 1000;
    
    if (cost == null) {
      cost = 3;
    }

    if (type == null) {
      type = '';
    }

    if (startDate.toString() == 'NaN') {
      startDate = "999999999999";
    }
   trip.find({'name':new RegExp(keyWord, "i"),'cost':{$lte: cost},'activities.sub_activities.best_time_start': {$lte : parseInt(startDate)}, 'destination.type' :new RegExp(type, "i") },function (err, myTrip) {
    if (err) return next(err);
    res.send(myTrip);
  });
});

module.exports = router;
