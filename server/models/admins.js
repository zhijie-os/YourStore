const mongoose = require('mongoose')


// set up customer's schema
const adminSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
})



module.exports = mongoose.model("admins",adminSchema)