// var express = require("express");
// var passport = require("passport");
// var router  = express.Router();
// var User = require("../models/user");


// //root route
// router.get("/", function(req, res){
//     res.render("landing");
// });


// router.get("/register", function(req, res) {
//     res.render("register");
// });

// router.post("/register", function(req, res){
//     var newUser = new User({username:req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(user); 
//             return res.redirect("back"); 
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/");
//         });
//     }); 
// }); 

//  //show login form
//  router.get("/login", function(req, res){
//     res.render("login"); 
//  });
 
// //handling login logic
// router.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/",
//         failureRedirect: "/login"
//     }), function(req, res){
// });

//  // logout route
//  router.get("/logout", function(req, res){
//     req.logout();
//     req.flash("success", "Logged you out!");
//     res.redirect("/");
//  });

// //  router.get("/admin", require('permission')(['admin']), function(req, res, next) {
// //     // Redirect Unauthenticated users.
    
// //     if (req.isAuthenticated()) {
// //         res.redirect("/");
  
// //     }else{
// //         res.send("not Authenticated ");
// //     }
   
//   });
 
 
 
//  module.exports = router;