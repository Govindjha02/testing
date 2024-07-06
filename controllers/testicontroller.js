const testi = require('../models/testi');
const Testi=require('../models/testi')


exports.admintesti=async(req,res)=>{
    const record=await testi.find()
    console.log(record);
            res.render('admin/testi.ejs',{record})
        }


exports.admintestistatusupdate=async(req,res)=>{
    const id =req.params.id
    const record=await testi.findById(id)
    let newstatus=null
    if (record.status=='unpublish'){
        newstatus='publish'
    }else{
        newstatus='unpublish'
    }
    await testi.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testi')
}        