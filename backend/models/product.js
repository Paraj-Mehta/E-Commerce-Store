const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    categories: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;