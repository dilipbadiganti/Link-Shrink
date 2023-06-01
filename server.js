const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const shrinks = require('./models/shortUrl')




app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/',async(req,res) => {

    const shortUrls = await shrinks.find()
    res.render('index', { shortUrls: shortUrls })
    // console.log(shortUrls)
})

app.post('/shortUrls',async(req,res)=>{ 

    await shrinks.create({ original: req.body.fullUrl })
    res.redirect('/')

})

app.get('/:shortUrl', async(req,res)=>{
    const shortUrl = await shrinks.findOne({ shortUrl: req.params.shortUrl })

    if (shortUrl == null){
        return res.sendStatus(404)
    }
    res.redirect(shortUrl.original)
})





mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected..')
    app.listen(process.env.PORT || 3000,()=>{
    console.log('App is listening on 3000...')
})
    
})



