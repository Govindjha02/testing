const Reg=require('../models/reg')



exports.adminloginpage=(req,res)=>{
    res.render('admin/login.ejs')
}

exports.adminlogincheck=async(req,res)=>{
    const {us,pass}=req.body;
   const usercheck=await Reg.findOne({username:us})
   if(usercheck!==null){   
       if (usercheck.password==pass){
   res.redirect('/admin/dashboard')
       }else{
           res.redirect('/admin/')
       }
   }else{
       res.redirect('/admin/')
   }
   }

   exports.admindashboard=(req,res)=>{
    res.render('admin/dashboard.ejs')
}