const mongoose = require('mongoose')

// set up seller's schema
const categorySchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Products:[String]
})


module.exports = mongoose.model("categories",sellerSchema)