const mongoose = require('mongoose')

// set up seller's schema
const sellerSchema = new mongoose.Schema({
    SellerID:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    SearchKeys:{
        type:[String],
        required:true
    }
})


module.exports = mongoose.model("products",sellerSchema)