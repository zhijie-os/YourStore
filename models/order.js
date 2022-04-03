const mongoose = require('mongoose')



// set up order's schema
const orderSchema = new mongoose.Schema({
    OrderID:{
        type:String,
        required:true
    },
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
    Products:{
        type:[{ProductID:String, Quantity:Number}],
        required:true
    }
})



module.exports = mongoose.model("order",orderSchema)