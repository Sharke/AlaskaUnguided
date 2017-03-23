var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ad = require('../models/partner.js');
/* GET /todos listing. */
router.get('/:id', function(req, res, next) {
  ad.find( {'related.id' : req.params.id } ,function (err, data) {
    if (err) return next(err);
    res.send(data);
  });
});


module.exports = router;
