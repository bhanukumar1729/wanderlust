const Listing=require("./models/listing.js")
const ExpressError = require("./utils/expressError.js")
const { listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLogin=(req,res,next)=>{
   
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login required")
        return res.redirect("/admin/login")
    }
        next();
}

module.exports.savedUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
      
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
 let listing = await Listing.findById(id);
 if(!listing.owner._id.equals(req.user.id)){
    req.flash("error","You are not the owner of the destination")
    return res.redirect(`/${id}`);
 }
 next();
}

module.exports.ValidateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error)
    } else {
        next()
    }
}

module.exports.ValidateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }}

    module.exports.isAuthor=async(req,res,next)=>{
    let{id,reviewId}=req.params;
     let review = await Review.findById(reviewId);
     if(!review.author._id.equals(req.user.id)){
        req.flash("error","You are not the author of the review")
       return  res.redirect(`/${id}`);
     }
     next();
    }
    