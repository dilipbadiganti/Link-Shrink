const mongoose = require('mongoose')
const shortId = require('shortid')

 
const shrinkSchema = new mongoose.Schema({

    original:{
        type:String,
        required:true
    },

    shortUrl:{
        type:String,
        required:true,
        default: shortId.generate
    }



})

module.exports = mongoose.model('shrink',shrinkSchema)