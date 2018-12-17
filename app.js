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
    
   //requiring routes
    var adminRoutes    = require("./routes/admin");

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


//redirect to login when admin is not loggedin
var notAuthenticated = {
  redirect: '/login'
};

app.set('permission', {
  notAuthenticated: notAuthenticated 
});
app.use("/", adminRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))