var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var tripSchema = new mongoose.Schema({
  name : String,
  thumbnail : String,
  description : String,
  summary : String,
  days : Number,
  cost : Number,
  recommended: Boolean,
  land : Boolean,
  water : Boolean,
  destination : [
    
  ],
  season : {
    q1: Boolean,
    q2 : Boolean,
    q3 : Boolean,
    q4 : Boolean
  },
  transports : [
  ],
  activities : [
 
  ],
  comments : [
   
  ],
  media : [
    
  ]
});
tripSchema.plugin(random);
module.exports = mongoose.model('trip', tripSchema);
