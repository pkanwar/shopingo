const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({

    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    loginId : String,
    firstName : String,
    lastName: String,
    mobileNumber: {
        type: String,
        required: true,
        uniquie: true
    },
    address: String,
    cart : [
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
    ]
})

module.exports = mongoose.model('User', userSchema);