if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require('./models/user.js');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStatergy = require("passport-local");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js"); 
const userRouter = require("./routes/user.js");

const DB_URL = process.env.ATLASDB_URL;

main().then(() => {
    console.log("Database Connected!");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(DB_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl : DB_URL,
    crypto: {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});

store.on("error",() => {
    console.log("ERROR in Mongo SESSION Store", err);
});

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 *  1000,
        maxAge : 7 + 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.get('/listings?', async (req, res) => {
    const searchQuery = req.query.q; 
});

app.use((err,req,res,next) => {
    let {stausCode = 500,message="Something Went Wrong"} = err;
    // res.staus(statuCode).render("error.ejs",{message})
    res.status(stausCode).render("error.ejs",{err});
    // res.status(stausCode).send(message);
});

 // Server Route and Port Number
const port = 3000;
app.listen(3000,() => {
    console.log(`Server is listing to Port ${port}`);
});