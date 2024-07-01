const User=require("../models/user.js");
let filter=''

module.exports.renderSignup=(req,res)=>{
    res.render('./user/signup.ejs',{filter});
}

module.exports.signup=async(req,res)=>{
    try{
        console.log(req.body)
    let{username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password);
    console.log(req.body);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","Welcome to wanderlust");
            res.redirect("/listings");
        } 
       })
    }catch(e){
            req.flash("error",e.message);
            res.redirect("/signup");
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render("./user/login.ejs",{filter})
}

module.exports.login=(req,res)=>{
    req.flash("success",'Welcome to Wanderlust')
    let url=res.locals.redirectUrl || "/listings";
    res.redirect(url)
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","You have successfully logged out")
            res.redirect("/listings");
        } 
       })
}