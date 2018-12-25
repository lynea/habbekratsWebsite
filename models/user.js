var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

  var UserSchema = new mongoose.Schema({
    username:  String,
    password: String,
    role:{type:String, enum: ["admin", "user"], default: "admin"}
  }); 
  
UserSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model('User', UserSchema);

///test git