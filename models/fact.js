var mongoose = require('mongoose');
var factSchema = new mongoose.Schema({
  fact: String,
});
module.exports = mongoose.model('fact', factSchema);
