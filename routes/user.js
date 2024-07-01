const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require('passport');
const { savedUrl } = require("../middleware.js");
const userController=require("../controller/user.js")

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup))

router.route("/login")
.get(userController.renderLogin)
.post(savedUrl,passport.authenticate("local",{failureRedirect: "/login",failureFlash : true}),userController.login)

router.get("/logout",userController.logout)

module.exports=router
