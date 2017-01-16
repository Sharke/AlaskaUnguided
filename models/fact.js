var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var factSchema = new mongoose.Schema({
  fact: String,
});
factSchema.plugin(random);
module.exports = mongoose.model('fact', factSchema);
