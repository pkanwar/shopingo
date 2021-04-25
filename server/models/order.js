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
            title : {
                type: String,
                required: true
            },
            imageUrl : {
                type: String,
                required: true
            },
            quantity : Number,
            discount: Number,
            actualPrice : {
                type: Number,
                required: true
            },
            totalPrice : Number,
            discountedPrice : Number,
            isDiscountAvailable : {
                type: String,
                required : true
            }
        }   
    ],
    totalAmount : {
        type:  Number,
        required: true
        },
    amountToBePaid : Number,
    status : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('Order', orderSchema);