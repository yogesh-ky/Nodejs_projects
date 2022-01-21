const express = require('express');
const passport = require("passport");
const PORT = process.env.PORT || 5000;
const expresslayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");

//Passport-config

require("./config/passport")(passport);

//Express-session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));

//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());

//Connect-Flash

app.use(flash());

//Global_vars

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//Db configuration

const db = require("./config/keys").MongoURI;

//Mongo Connect

mongoose.connect(db)
.then(()=>console.log("MongoDb connected......."))
.catch(err => console.log(err));

//EJS
app.use(expresslayouts);
app.set("view engine", 'ejs');

//BodyParser

app.use(express.urlencoded( {extended: false} ));

//routes

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/users"));
app.use("/users", require("./routes/users"));


app.listen(PORT, console.log(`Server Listening On Port ${PORT} `));