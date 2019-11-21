var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");
var Product = require("../models/product");
var multer = require("multer");
var Post = require("../models/postModel");
var fs = require("fs");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/posts");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

var imgStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var imgUpload = multer({ storage: imgStorage });

//============================
//AUTH Routes
//============================

router.get("/", function(req, res) {
  Promise.all([
    Product.find({ bestSeller: true }),
    Product.find({ newArrival: true })
  ]).then(([allBestSellers, allNewArrivals]) => {
    res.render("landing", {
      bestSellers: allBestSellers,
      newArrivals: allNewArrivals
    });
  });
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(user);
      return res.redirect("back");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
});

router
  .get("/login", function(req, res) {
    res.render("login");
  })
  .post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/login"
    })
  );

router.get("/admin", require("permission")(["admin"]), function(
  req,
  res,
  next
) {
  // Redirect Unauthenticated users.

  if (req.isAuthenticated()) {
    res.render("admin");
  } else {
    res.redirect("/login ");
  }
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

router
  .route("/inventory")
  .get(require("permission")(["admin"]), function(req, res, next) {
    // Redirect Unauthenticated users.

    if (req.isAuthenticated()) {
      // Get all posts from DB
      Product.find({}, function(err, allProducts) {
        if (err) {
          console.log(err);
        } else {
          res.render("inventory", { products: allProducts });
        }
      });
    } else {
      res.send("not Authenticated ");
    }
  })

  .post(imgUpload.single("image"), function(req, res) {
    var usedFurn = Boolean(req.body.used);
    var newFurn = Boolean(req.body.new);
    var name = req.body.name;
    var mainImagePath = "uploads/products/" + req.file.filename;
    var bestSeller = Boolean(req.body.bestSeller);
    var newArrival = Boolean(req.body.newArrival);
    var description = req.body.description;

    var red = Boolean(req.body.red);
    var blue = Boolean(req.body.blue);
    var yellow = Boolean(req.body.yellow);
    var green = Boolean(req.body.green);

    var fabric = Boolean(req.body.fabric);
    var leather = Boolean(req.body.leather);
    var sixtyPercent = Boolean(req.body.sixtyPercent);
    var seventyPercent = Boolean(req.body.seventyPercent);

    var twoSeater = Boolean(req.body.twoSeater);
    var twoHalfSeater = Boolean(req.body.twoHalfSeater);
    var threeSeater = Boolean(req.body.threeSeater);
    var cornerCouch = Boolean(req.body.cornerCouch);

    var category = req.body.category;
    var subCat = req.body.subCat;

    var newProduct = {
      name: name,
      mainImagePath: mainImagePath,
      description: description,
      cat: category,
      subCat: subCat,
      newArrival: newArrival,
      bestSeller: bestSeller,
      usedFurn: usedFurn,
      newFurn: newFurn,

      colors: {
        red: red,
        blue: blue,
        yellow: yellow,
        green: green
      },
      materials: {
        fabric: fabric,
        leather: leather,
        sixtyPercent: sixtyPercent,
        seventyPercent: seventyPercent
      },
      sizes: {
        twoSeater: twoSeater,
        twoHalfSeater: twoHalfSeater,
        threeSeater: threeSeater,
        cornerCouch: cornerCouch
      }
    };

    // Create a new post and save to DB

    Product.create(newProduct, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect back to campgrounds page
        console.log(newlyCreated);
        res.redirect("/inventory");
      }
    });
  });

router.route("/inventory/:id").delete(function(req, res) {
  Product.findById(req.params.id, function(err, newProduct) {
    var path = "public/" + newProduct.mainImagePath;
    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }),
    Product.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.redirect("back");
      } else {
        res.redirect("/inventory");
      }
    });
});
router.get("/inventory/:id/edit", function(req, res) {
  Product.findById(req.params.id, function(err, foundProduct) {
    res.render("editProduct", { product: foundProduct });
  });
});

router.put("/inventory/:id", function(req, res) {
  // find and update the correct post
  // not working for image yet

  Product.findByIdAndUpdate(req.params.id, req.body.product, function(
    err,
    updatedPost
  ) {
    if (err) {
      res.redirect("/admin");
    } else {
      //redirect somewhere(show page)
      res.redirect("/inventory");
    }
  });
});

//=========================================================================================
// routes for CRUD Posts
//=========================================================================================

router
  .route("/posts")
  .get(require("permission")(["admin"]), function(req, res, next) {
    // Redirect Unauthenticated users.

    if (req.isAuthenticated()) {
      // Get all posts from DB
      Post.find({}, function(err, allPosts) {
        if (err) {
          console.log(err);
        } else {
          res.render("posts", { posts: allPosts });
        }
      });
    } else {
      res.send("not Authenticated ");
    }
  })
  .post(upload.single("image"), function(req, res) {
    var title = req.body.title;
    var imagePath = "uploads/posts/" + req.file.filename;
    var summary = req.body.summary;
    var body = req.body.body;
    var creationDate = new Date().toLocaleDateString("nl-NL");
    var newPost = {
      title: title,
      imagePath: imagePath,
      summary: summary,
      body: body,
      creationDate: creationDate
    };
    // console.log(newPost);
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect back to campgrounds page
        // console.log(newlyCreated);
        res.redirect("/posts");
      }
    });
  });

router.route("/posts/:id").delete(function(req, res) {
  Post.findById(req.params.id, function(err, newPost) {
    var path = "public/" + newPost.imagePath;
    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }),
    Post.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.redirect("back");
      } else {
        res.redirect("/posts");
      }
    });
});
router.get("/posts/:id/edit", function(req, res) {
  Post.findById(req.params.id, function(err, foundPost) {
    res.render("editPost", { post: foundPost });
  });
});

router.put("/posts/:id", function(req, res) {
  // find and update the correct post
  // not working for image yet

  Post.findByIdAndUpdate(req.params.id, req.body.post, function(
    err,
    updatedPost
  ) {
    if (err) {
      res.redirect("/admin");
    } else {
      //redirect somewhere(show page)
      res.redirect("/posts");
    }
  });
});

// front-end routes

// must add fiter in back end instead of front
router.get("/nieuw-binnen", function(req, res) {
  Product.find({}, function(err, allProducts) {
    if (err) {
      console.log(err);
    } else {
      res.render("nieuwBinnen", { products: allProducts });
    }
  });
});

router.get("/products/:id", function(req, res) {
  Product.findById(req.params.id, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { product: foundProduct });
    }
  });
});

module.exports = router;
