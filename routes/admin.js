var express = require("express");
var passport = require("passport");
var router  = express.Router();
var User = require("../models/user");
var multer  = require('multer');
var Post = require("../models/postModel"); 
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/posts')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
   
  var upload = multer({ storage: storage });

 

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
.post(upload.single('image'),function(req, res){ 
    var title = req.body.title;
    var imagePath = "uploads/posts/"+ req.file.filename; 
    var summary = req.body.summary; 
    var body = req.body.body;
    var creationDate = new Date().toLocaleDateString("nl-NL");
    var newPost = {title: title, imagePath: imagePath, summary: summary, body:body, creationDate:creationDate}
    // console.log(newPost);
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            // console.log(newlyCreated);
            res.redirect("/posts");
        }
    });
});



router.delete("/posts/:id", function(req, res){
    Post.findById(req.params.id, function (err, newPost) {
        var path = "public/"+ newPost.imagePath; 
        try{ fs.unlinkSync(path)
            //file removed
          } catch(err) {
            console.error(err)
          }
    }), 
    Post.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/posts");
        }
    })
});




 
 module.exports = router;