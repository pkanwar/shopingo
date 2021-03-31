const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
   productId : {
       type: String,
       required: true,
       unique : true
   },
   quantity : Number,
   sessionId : {
       type: String,
       required: true
   },
   totalPrice : Number,
   discountedPrice : Number
})

module.exports = mongoose.model('Cart', cartSchema);