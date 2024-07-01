const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
let filter=''

module.exports.renderNew=async(req, res) => {
    let { id } = req.params;
    let listing=await Listing.findById(req.params.id)
    if(!listing){
        req.flash("error","Listing not found")
       return res.redirect("/listings");
    }
    res.render("./listings/review.ejs", {id,filter})
}

module.exports.createNew=async (req, res) => {
    let listing=await Listing.findById(req.params.id)
    let newReview=new Review(req.body.review)
    newReview.author=req.user.id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review Created")
    res.redirect(`/listings/${req.params.id}`)
  }

  module.exports.destroyreview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("deleted","review deleted")
    res.redirect(`/listings/${id}`)
  }