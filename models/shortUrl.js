const mongoose=require('mongoose')
const shortid=require('shortid')

const shortUrlSchema=new mongoose.Schema({
    full: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    short: {
        type: String,
        required: true,
        trim: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

module.exports=mongoose.model('ShortUrl', shortUrlSchema)
// Syntax : name of the Schema, schema