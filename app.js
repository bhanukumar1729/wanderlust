require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate")

const session =require("express-session");
const flash=require("connect-flash");
const Mongostore=require("connect-mongo")

const passport=require("passport")
const LocalStrategy=require("passport-local")
const user=require("./models/user.js")

const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute=require("./routes/user.js");
const { error } = require('console');

// const mongoUrl="mongodb://127.0.0.1:27017/wanderlust"
const dbUrl=process.env.ATLASDB_URL
async function main() {
    await mongoose.connect(dbUrl)
}
app.listen(port, () => {
    console.log('server is listening to port')
})
main().then(() => {
    console.log('database connected')
})
    .catch(() => {
        console.log("error occured")
    })

app.set('view engine', "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))



const store=Mongostore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },touchAfter:24*3600,
})


store.on("error",()=>{
    console.log("Error in mongo db store",store)
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()))

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.deleted=req.flash("deleted");
    res.locals.updated=req.flash("updated");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    res.locals.isSearch=typeof req.body.search =="undefined"?false:true;
    next();
})


app.use('/',userRoute)

app.use('/listings',listingRoute)

app.use('/listings/:id/review',reviewRoute)

app.use((err, req, res, next) => {
    let { statusCode=500, message='something went wrong' } = err;
    console.log(err)
    res.status(statusCode).render("./listings/error.ejs",{message})
    //res.status(statusCode).send(message)
});

app.use((req,res,next)=>{
    let message="address not found";
    res.render("./listings/error.ejs",{message})
})



