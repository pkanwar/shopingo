const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId : {
        type:  String,
        required: true
    },
    items : [
        {
            productId : {
                type: String,
                required: true
            },
            quantity : {
                type: Number,
                required: true
            },
            totalPrice : Number,
            discountedPrice : Number            
        }   
    ],
    amount : {
        type:  Number,
        required: true
    },
    status : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('Order', orderSchema);