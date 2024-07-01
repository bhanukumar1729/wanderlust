const Listing = require("../models/listing.js")
let pastFilter=''
let filter=''
const Filter=require("../models/utils.js")

module.exports.index= async (req, res) => {
    const allListings = await Listing.find({});
    const filtersList=await Filter.find({});
    res.render("./listings/index.ejs", { allListings ,filter,filtersList})
}

module.exports.getNew=async(req, res) => {
    const filtersList=await Filter.find({});
    res.render("./listings/new.ejs",{filtersList})
}

module.exports.show=async (req, res) => {
    let { id } = req.params;
    const list = await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!list){
        req.flash("error","distination not found")
        return res.redirect("/");
    }
    list.trending+=1;
    await list.save()
    res.render("./listings/show.ejs", { list })
}

module.exports.create=async (req, res) => {
    let url=req.file.path;
    let fileName=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user.id;
    newListing.trending=0;
    newListing.image={
        url,fileName
    }
    await newListing.save();
    req.flash("success","Destination added successfully!")
    // res.send(req.body)
    res.redirect('/');
}

module.exports.getEdit=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    const filtersList=await Filter.find({});
    if(!listing){
        req.flash("error","Destination not found")
        return res.redirect("/");
    }
    res.render("./listings/edit.ejs", { listing ,filtersList})
}

module.exports.edit=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let fileName=req.file.filename;
    listing.image={url,fileName}
    await listing.save()
    }
    req.flash("updated","Destination updated")
    res.redirect(`/${id}`);
}
module.exports.delete=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted","Destination deleted")
    res.redirect(`/`);
}
module.exports.renderFilter=async(req,res)=>{
    const {filter}=req.params;
    const filtersList=await Filter.find({});
    if(filter ==="Trending"){
        Listing.aggregate().sort({ trending: -1 }) 
    .then(allListings => { 
        res.render("./listings/index.ejs",{allListings,filter,filtersList})
    })
    }else{
        let allListings=await Listing.find({filters :{$in :filter} });
        res.render("./listings/index.ejs",{allListings,filter,filtersList})
    }
    
}

module.exports.deselect=(req,res,next)=>{
    const {filter}=req.params;
if(pastFilter === filter){
    pastFilter=''
   res.redirect("/")
}
else{
    pastFilter=filter
    next();
}
}
module.exports.search=async(req,res,next)=>{
const text=req.body.search;
if(text!=""){
let filter="search";
const filtersList=await Filter.find({});
let allListings=await Listing.find({$or:[{title:{$regex:text}},{description:{$regex:text}},{country:{$regex:text}},{location:{$regex:text}}]})
res.render("./listings/index.ejs",{allListings ,filter,filtersList})
}else{
    res.redirect("/")
}
}
