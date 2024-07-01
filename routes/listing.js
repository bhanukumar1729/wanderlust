const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js")
const router = express.Router();
const {isLogin,isOwner,ValidateListing}=require('../middleware.js')
const listingController=require("../controller/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})
router.post("/filter/find",listingController.search)
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLogin,upload.single('listing[image]'),ValidateListing,wrapAsync(listingController.create));

router.get("/new", isLogin,listingController.getNew)
router.get("/:id/edit",isLogin,isOwner, wrapAsync(listingController.getEdit))

router.get("/filters/:filter",listingController.deselect,listingController.renderFilter)

router.route("/:id")
.get(isLogin,wrapAsync(listingController.show))
.put(isLogin,isOwner,upload.single("listing[image]") ,ValidateListing, wrapAsync(listingController.edit))
.delete(isLogin,isOwner, wrapAsync(listingController.delete))

module.exports=router

