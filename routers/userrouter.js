const router=require('express').Router()//module
const banner=require('../models/banner')
const service = require('../models/service')
const Service=require('../models/service')
const testi=require('../models/testi')
const multer=require('multer')
const Query=require('../models/query')
const { query } = require('express')
const bannerrc=require('../controllers/bannercontroller')
const Servicerc=require('../controllers/servicescontroller')
const Regrc=require('../controllers/regcontroller')
const Queryrc=require('../controllers/querycontroller')


let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

 let upload=multer({
    storage:storage,
    limits:{file:1024*1024*4}
})


router.get('/',async(req,res)=>{
    const bannerRecord=await banner.findOne()
    const serviceRecord=await service.find({status:'publish'})
   const testiRecord=await testi.find({status:'publish'})
   res.render('index.ejs',{bannerRecord,serviceRecord,testiRecord})
})

router.get('/banner',async(req,res)=>{
    const record=await banner.findOne()
    res.render('banner.ejs',{record})
})

router.get('/servicedetail/:id',async(req,res)=>{
  const id=req.params.id
  const record=await service.findById(id)
  res.render('servicedetail.ejs',{record})
})

router.get('/testi',(req,res)=>{
    res.render('testiform.ejs')
})

router.post('/testi',upload.single('img'),(req,res)=>{
   const{quotes,name}=req.body
    if(req.file){
        const filename=req.file.filename;
    const record=new testi({quotes:quotes,name:name,img:filename})
    record.save()
    }else{
     const record=new testi({quotes:quotes,name:name,img:'bar.jpg'})
        record.save()
    }
    //console.log(record);
})

router.post('/',(req,res)=>{
    const {email,query}=req.body
    const record=new Query({email:email,query:query})
    record.save()
    //console.log(record)
})




module.exports=router