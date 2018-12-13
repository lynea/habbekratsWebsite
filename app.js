//adminTestApp

var express             = require("express"),
    app                 = express(),
    mongoose            = require("mongoose"), 
    bodyParser          = require("body-parser"), 
    passport            = require("passport"),
    localStrategy       = require("passport-local"), 
    methodOverride      = require("method-override"),
    User                = require("./models/user"),
    cookieParser        = require('cookie-parser'),
    session             = require("express-session");

    const port = 3000
    
   
    //middleware req
  

//using dependancies
mongoose.connect("mongodb://localhost/habbekrats"); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//voor flash messages 

// seedDB(); //seed the database
app.use(cookieParser());


// Express session setup.
app.use(session({
  secret: "4378r4hjnjhfgrbwqhjfhoyf2jnrbhweyurf23njk4hu23y84i23r2wesdg32rt3566t7ew8oiljgsjdbghiwu4o3jt34ugi23fwvf",
  resave: false,
  saveUninitialized: true
  })
);


app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//============================
//AUTH Routes
//============================

app.get("/", function(req, res) {
    res.send("homepage");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res){
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

app.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }));


app.get("/admin", require('permission')(['admin']), function(req, res, next) {
  // Redirect Unauthenticated users.
  
  if (req.isAuthenticated()) {
      res.render("admin");

  }else{
      res.send("not Authenticated ");
  }
 
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))