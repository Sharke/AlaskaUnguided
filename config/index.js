var mongoose = require('mongoose');
var util = require('util');
var db = require('./db');
var server = require('./server')
module.exports =  {
    mongoConnect : function() {
        mongoose.connect(`mongodb://${db.username}:${db.password}@${db.host}/${db.database}`,function(err){
            if (err) { 
                throw err;
            }
            else {
                 util.log(`Connected to ${db.host}/${db.database} as ${db.username}`);  
            }
        });
    },  
    
    server:server
}