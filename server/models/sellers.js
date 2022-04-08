const mongoose = require('mongoose')

// set up seller's schema
const sellerSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    CardNumber: {
        type: String,
        required: true
    },
    Orders: {
        type: [String],
        required: true
    },
    Products: {
        type: [String],
        required: true
    },
})


module.exports = mongoose.model("sellers", sellerSchema)