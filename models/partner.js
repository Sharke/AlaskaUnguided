var mongoose = require('mongoose');
var adSchema = new mongoose.Schema({
  name: String,
  related: [],
  url: String,
  image: String,
});
module.exports = mongoose.model('ad', adSchema);
