var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  hash: String,
  key: String
});

module.exports = mongoose.model('user', userSchema);
