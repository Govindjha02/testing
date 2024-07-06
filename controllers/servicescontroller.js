const service = require('../models/service')
const Service=require('../models/service')


exports.adminservice=async(req,res)=>{
    const record=await service.find().sort({postedDate:-1})
const totalService=await service.count()
const publishcount=await service({status:'publish'})
const unpublish=await service.count({status:'unpublish'})
//console.log(unpublish)
    res.render('admin/service.ejs',{record,totalService,publishcount,unpublish})
}

exports.adminserviceaddform=(req,res)=>{
    res.render('admin/serviceform.ejs')
}

exports.adminserviceadd=(req,res)=>{
    const filename=req.file.filename
    const {sname,sdesc,sldesc}=req.body
    let currentDateTime=new Date()
    const record=new service({name:sname,desc:sdesc,ldesc:sldesc,postedDate:currentDateTime,img:filename})
    record.save()
    res.redirect('/admin/service')
}

exports.adminservicedelete=async(req,res)=>{
    const id=req.params.id
    await service.findByIdAndDelete(id)
    res.redirect('/admin/service')
}

exports.adminservicestatusupdate=async(req,res)=>{
    const id=req.params.id
    const record=await service.findById(id)
    let currentstatus=null
    if(record.status=='unpublish'){
       currentstatus='publish'
    }else{
       currentstatus='unpublish'
    }
    await service.findByIdAndUpdate(id,{status:currentstatus})
    res.redirect('/admin/service')
   }

