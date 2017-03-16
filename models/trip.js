var mongoose = require('mongoose');
var tripSchema = new mongoose.Schema({
  name : String,
  thumbnail : String,
  description : String,
  summary : String,
  days : Number,
  cost : Number,
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
module.exports = mongoose.model('trip', tripSchema);
