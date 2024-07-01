const mongoose=require("mongoose");
const schema=mongoose.Schema;
const review=require("./review.js");
const { string } = require("joi");

const listingSchema=new schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:
    {
        type:Number,
        default:0
    },
    location:String,
    country:String,
    review:[{
        type:schema.Types.ObjectId,
        ref:"Review"
    }
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    filters:[{
        type:String
    }],
    trending:{
        type:Number,}
})

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.review}})
    }

})
const listing=mongoose.model("listing",listingSchema)
module.exports=listing;