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
                 required: true,
                 unique : false
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
    status : {
        type : String,
        required : true
    },
    amount : {
        type:  Number,
        required: true
        },
    currency : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('Order', orderSchema);