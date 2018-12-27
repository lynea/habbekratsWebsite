var mongoose = require('mongoose');


  var ProductSchema = new mongoose.Schema({
    name:  String,
    usedFurn:Boolean,
    newFurn:Boolean,
    // categories:{
    //   couch:{
    //     type:Boolean, 
    //     subCat:{
    //       bank:Boolean,
    //       hoekbank:Boolean,
    //     },
    //   },
    //   table:{
    //     type:Boolean, 
    //     subCat:{
    //       salonTafel:Boolean,
    //       eetTafel:Boolean,
    //       hoekTafel:Boolean,
    //     },
    //   },
    //   closet:{
    //     type:Boolean, 
    //     subCat:{
    //       wandmeubel:Boolean,
    //       vitrineKast:Boolean,
    //     },
    //   },
    // },

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