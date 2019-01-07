var mongoose = require('mongoose');


  var ProductSchema = new mongoose.Schema({
    name:  String,
    usedFurn:Boolean,
    newFurn:Boolean,
    cat: String,
    subCat: String, 
    mainImagePath: String, 
    extraImagePath: String,
    description: String,
    materials:{
      fabric:Boolean,
      leather:Boolean,
      sixtyPercent:Boolean, 
      seventyPercent:Boolean,
    },
    sizes:{
      twoSeater:Boolean, 
      twoHalfSeater:Boolean, 
      threeSeater:Boolean, 
      cornerCouch:Boolean, 
    },
    colors:{
      red:Boolean, 
      blue:Boolean, 
      yellow:Boolean,
      green:Boolean, 
    }, 
    newArrival:Boolean, 
    bestSeller:Boolean, 
  }); 
  
module.exports = mongoose.model('Product', ProductSchema);