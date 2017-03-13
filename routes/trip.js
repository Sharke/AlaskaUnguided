var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var trip = require('../models/trip.js');
/* GET /todos listing. */
router.get('/search', function(req, res, next) {
    var cost = req.query.cost;
    var keyWord = req.query.keyword;
    var type = req.query.type;
    var startDate = req.query.start;
    var endDate = req.query.end;
    if (cost == null) {
      cost = 1;
    }
    trip.find({'name':new RegExp(keyWord, "i"),'cost':{$lte: cost}},function (err, myTrip) {
    if (err) return next(err);
    res.send(myTrip);
  });
});

module.exports = router;
