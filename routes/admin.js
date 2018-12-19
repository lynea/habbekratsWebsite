var express = require("express");
var passport = require("passport");
var router  = express.Router();
var User = require("../models/user");
var Post = require("../models/postModel"); 


 

//============================
//AUTH Routes
//============================

router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(user); 
            return res.redirect("back"); 
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    }); 
}); 

router.get("/login", function(req, res) {
    res.render("login");
})
.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/admin",
        failureRedirect: "/login"
    }));


router.get("/admin", require('permission')(['admin']), function(req, res, next) {
  // Redirect Unauthenticated users.
  
  if (req.isAuthenticated()) {
      res.render("admin");

  }else{
      res.redirect("/login ");
  }
 
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

router.get("/inventory", require('permission')(['admin']), function(req, res, next) {
    // Redirect Unauthenticated users.
    
    if (req.isAuthenticated()) {
        res.render("inventory");
  
    }else{
        res.send("not Authenticated ");
    }
});

router.route('/posts')
.get(require('permission')(['admin']), function(req, res, next) {
    // Redirect Unauthenticated users.
    
    if (req.isAuthenticated()) {
        // Get all posts from DB
        Post.find({}, function(err, allPosts){
            if(err){
                console.log(err);
            } else {
               res.render("posts",{posts:allPosts});
            }
         });
    }else{
        res.send("not Authenticated ");
    }
})
.post(function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var summary = req.body.summary; 
    var body = req.body.body;
   
    var newPost = {title: title, image: image, summary: summary, body:body}
    console.log(newPost); 
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/posts");
        }
    });
});

 
 module.exports = router;