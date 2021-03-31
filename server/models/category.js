const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name : {
        type : String,
        required: true,
        unique: true
    },
    thumbnail : String,
    subCategories : [
        {
            subName : {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Category', categorySchema);