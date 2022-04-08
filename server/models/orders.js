const mongoose = require('mongoose')

// set up order's schema
const orderSchema = new mongoose.Schema({
    CustomerID:{
        type:String,
        required:true
    },
    SellerID:{
        type:String,
        required:true
    },
    Total:{
        type:Number,
        required:true
    },
    ReceiverName:{
        type:String,
        required:true
    },
    ReceiverAddress:{
        type:String,
        required:true
    },
    Payment:{
        type:Boolean,
        required:true,
    },
    Cancelled:{
        type:Boolean,
        required:true
    },
    Shipped:{
        type:Boolean,
        required:true
    },
    ShipmentLabel:{
        type:String,
        required:true
    },
    Product:{
        type:String,
        required:true
    }
})



module.exports = mongoose.model("orders",orderSchema)