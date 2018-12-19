var mongoose = require('mongoose');


  var PostSchema = new mongoose.Schema({
    title:  String,
    imagePath: String,
    body: String,
    summary:String
  }); 
  
module.exports = mongoose.model('Post', PostSchema);