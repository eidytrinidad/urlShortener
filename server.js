const express=require('express')

const app= express()
const mongoose = require('mongoose')
const shortUrl=require('./Models/shortUrl')

mongoose.connect('mongodb+srv://Eidy:19931993@nodetutos.3zjgv.mongodb.net/URLShortener?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.get('/',async(req,res)=>{
    const shortUrls=await shortUrl.find()
    res.render('index',{shortUrls})
})

app.post('/shortUrls',async(req,res)=>{
  await  shortUrl.create({full:req.body.fullUrl})
  res.redirect('/')
})

app.get("/:shortURL",async(req,res)=>{
   const short= await shortUrl.findOne({short:req.params.shortURL}) 

   if(short==null)return res.sendStatus(404)
   
   short.clicks++
   short.save()
   res.redirect(short.full)
})
app.listen(process.env.port||4000,()=>{
    console.log("server Running")
})