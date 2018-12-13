var   express               = require("express"),
        app                 = express(),
        cookieParser        = require('cookie-parser'),
        session             = require("express-session");
        mongoose            = require("mongoose"), 
        bodyParser          = require("body-parser"), 
        passport            = require("passport"),
        localStrategy       = require("passport-local"), 
        methodOverride      = require("method-override"),
        User                = require("./models/user"),
        mongoose            = require('mongoose');
        port = 3000


//using dependancies
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser());

//DB connection 
mongoose.connect('mongodb://localhost/habbekrats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection to database succesfull");
});

var adminRoutes    = require("./routes/admin");
app.use(adminRoutes);
// Express session setup.
app.use(session({
    secret: "4378r4hjnjhfgrbwqhjfhoyf2jnrbhweyurf23njk4hu23y84i23r2wesdg32rt3566t7ew8oiljgsjdbghiwu4o3jt34ugi23fwvf",
    resave: false,
    saveUninitialized: true
    })
);
  
// passport setup 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
  





app.listen(port, () => console.log(`Example app listening on port ${port}!`))