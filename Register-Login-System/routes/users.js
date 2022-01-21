const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
//User Model
const User = require("../model/User");

//login
router.get("/login", (req,res)=>{

    res.render("login");

})

//register
router.get("/register", (req,res)=>{

    res.render("register");

})

//register post

router.post("/register", (req,res)=>{
    const { name, email, password, password2 } = req.body;
    let errors=[];
    if (!name || !email || !password || !password2){
        errors.push({msg: "Please Fill in all fields"});

    } 
    if(password !== password2){
        errors.push({msg: "Confirm Password does not match"});
    }
    if(password.length < 6){
        errors.push({msg: "Password Should be atleast 6 characters"});
    }
    if(errors.length > 0){
        res.render("register",{
        errors,
        name,
        email,
        password,
        password2
    });
    }else{
        //validdation passed
        User.findOne({ email: email })
        .then(user => {
            if(user){
                //same user email exists
                errors.push({ msg: "Email Already Registered" });
                res.render("register",{   
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else {
                const newUser = new User({
                  name,
                  email,
                  password
                });
                //hashpassword
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                      .save()
                      .then(user => {  
                        req.flash("success_msg", "You are registered and can login now");     
                        res.redirect('/users/login');
                      })
                      .catch(err => console.log(err));
                  });
                });
                console.log(newUser);
              }
            });
          }
        });

router.get("/dashboard", (req,res)=>{

    res.render("dashboard");

});
//login
router.post("/login", (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
});

//logout

router.get("/logout", (req,res)=>{
    req.logout();
    req.flash('success_msg', "You Have Been SuccessFully LoggedOut!");
    res.redirect("/users/login");
});

module.exports = router;