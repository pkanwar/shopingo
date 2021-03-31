const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    subCategory : {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: true
    },
    discount: Number,
    price : {
        actualPrice : {
            type: Number,
            required: true
        },
        discountedPrice: Number
    }

})

module.exports = mongoose.model('Product', productSchema);