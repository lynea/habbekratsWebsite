var mongoose = require('mongoose');


  var PostSchema = new mongoose.Schema({
    title:  String,
    image: String,
    body: String,
    summary:String
  }); 
  
module.exports = mongoose.model('Post', PostSchema);