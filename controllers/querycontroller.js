const Query=require('../models/query')


exports.adminquery=async(req,res)=>{
    const record=await Query.find()
    res.render('admin/query.ejs',{record})
}

exports.adminqueryreply=async(req,res)=>{
    const id=req.params.id
    const record=await Query.findById(id)
    //console.log(record);
    res.render('admin/replyform.ejs',{record})
}

exports.adminqueryreplystatus