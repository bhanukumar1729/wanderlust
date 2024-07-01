const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js")
const router = express.Router({mergeParams:true});
const{ValidateReview,isLogin,isAuthor}=require("../middleware.js")
const reviewController=require("../controller/review.js")

router.route("/")
.get(isLogin,reviewController.renderNew)
.post(isLogin,ValidateReview, wrapAsync(reviewController.createNew));

router.delete("/:reviewId",isAuthor,wrapAsync(reviewController.destroyreview))

module.exports=router
      