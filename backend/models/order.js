const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }, 

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type : Number,
                default: 1
            }
        }
    ],

    amount : {
        type : Number,
        required : true
    },

    currency : {
        type : String,
        required : true
    },

    status : {
        type : String,
        required : true,
        default : "pending",
        enum : ["pending", "paid", "cancelled"]
    },

    orderId : {
        type : String,
        required : true
    }


});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;