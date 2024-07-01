const mongoose=require("mongoose");
const listing=require("../models/listing.js");
const Filter=require("../models/utils.js")
const initData=require("./data.js");
async function main(){
    await mongoose.connect(process.env.ATLASDB_URL)
}
main().then(()=>{
    console.log('database connected')
})
.catch((e)=>{
    console.log("error occured",e)
})
const initDB= async ()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>
        ({...obj,owner:"667c089dcf12b83a5e69afb8"})
    )
    await Filter.deleteMany({});
   await Filter.insertMany(initData.data1)
    await listing.insertMany(initData.data)

    console.log('data intialized')
}
initDB();