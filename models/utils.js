const mongoose = require("mongoose");
const schema = mongoose.Schema;

const filterSchema=new schema({
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,

    }
})
module.exports=mongoose.model("Filter",filterSchema)