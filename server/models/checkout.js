const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkoutSchema = new Schema({
    cartId : {
        type : String,
        required:  true   
    },
    deliveryAddress : {
        type: String,
        required: true
    },
    billingAddress : {
        type: String,
        required: true
    },
    totalPrice : Number,
    discountedPrice : Number
})

module.exports = mongoose.model('Checkout', checkoutSchema);