const { string } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportLocalsMongoose=require("passport-local-mongoose")

const userSchema = new schema({
    email:{
        type:String,
        required:true,
    }

})

userSchema.plugin(passportLocalsMongoose)

module.exports=mongoose.model("User",userSchema)