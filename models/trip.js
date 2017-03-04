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
  destination : {
    name : String,
    type : String,
    subdestinations : [
      {
        name : String,
        type : String,
        map : String
      }
    ]
  },
  season : {
    q1: Boolean,
    q2 : Boolean,
    q3 : Boolean,
    q4 : Boolean
  },
  transports : [
    {
      name : String,
      type : String
    }
  ],
  activities : [
    {
      name : String,
      sub_activities : [
        {
          name : String,
          best_time : String
        }
      ]
    }
  ],
  comments : [
    {
      user : String,
      review : Number,
      comment : String
    }
  ],
  media : [
    {
      type : String,
      caption : String,
      url : String
    }
  ]
});
module.exports = mongoose.model('trip', tripSchema);
