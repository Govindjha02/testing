const express=require('express')//function
const app=express()//module
app.use(express.urlencoded({extended:false}))
const userRouter=require('./routers/userrouter')
const adminRouter=require('./routers/admin')
const mongoose=require('mongoose')//module

mongoose.connect('mongodb://127.0.0.1:27017/finalproject')


app.use(userRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000,()=>{console.log('server is running on port 5000')})

