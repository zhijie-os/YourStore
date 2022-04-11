const mongoose = require('mongoose')

// set up product's schema
const productSchema = new mongoose.Schema({
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
    Inventory:{
        type: Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    SearchKeys:{
        type:[String],
        required:true
    },
    Category:{
        type: String,
        required:true
    },
    Owned:{
        type: Boolean,
        required:true
    }
})


module.exports = mongoose.model("products",productSchema)