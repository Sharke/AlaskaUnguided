var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ad = require('../models/ad.js');
/* GET /todos listing. */
router.get('/:type', function(req, res, next) {
  ad.find( {'related' : req.params.type } ,function (err, data) {
    if (err) return next(err);
    res.send(data);
  });
});


module.exports = router;
