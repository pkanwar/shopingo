const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
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
            discountedPrice: Number
        }
   ],
   userId : String,
   sessionId : {
    type: String,
    required: true,
    unique : true
   }
})

module.exports = mongoose.model('Cart', cartSchema);