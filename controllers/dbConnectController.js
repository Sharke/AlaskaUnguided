var mongoose = require('mongoose');
var db = require('../config/db');
var util = require('util');

module.exports = {
    connect : function() {
        mongoose.connect(`mongodb://${db.username}:${db.password}@${db.host}/${db.database}`,function(err){
            if (err) { 
                throw err;
            }
            else {
                 util.log(`Connected to ${db.host}/${db.database} as ${db.username}`);  
            }
        });
    }
}