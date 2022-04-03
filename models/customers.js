const mongoose = require('mongoose')



// set up customer's schema
const customerSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Cart:{
        type:[{ProductID:String, Quantity:Number}],
        required:true
    }
})



module.exports = mongoose.model("customers",customerSchema)