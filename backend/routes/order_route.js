const router = require("express").Router();
const razorpayInstance = require('../middleware/razorpay');
const {protect} = require("../middleware/authMiddleware");
const Order = require("../models/order");
const AddToCart = require("../models/addToCart");
const { verify } = require("jsonwebtoken");


// Endpoint to create an order
router.post('/create-order', protect, async (req, res) => {
    const { amount, currency , cartItem} = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency: currency || 'INR',
        };

        const order = await razorpayInstance.orders.create(options);

        await Order.create({
            userID : req.user._id,
            amount  : amount,
            currency : currency,
            status : "pending",
            orderId : order.id,
            items : cartItem
        })

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
});

router.post('/verify-order', protect, async (req, res)=> {
    const {orderId, paymentId, amount, cartItem } = req.body;

    try{

        const order = await Order.findOne({ orderId });

        if(!order) {
            return res.status(404).json({message : "Order Not Found"})
        }

        if(order.status !== "pending") {
            return res.status(400).json({messsage : "Order is already paid"})
        }

        order.status = "paid"
        order.paymentId = paymentId
        order.amount = amount
        await order.save()


        const options = {
            amount : amount * 100,
            currency : "INR",
            receipt : paymentId,
            order_id : orderId
        };

        // const verify = await razorpayInstance.orders.verfiy(options);
        // console.log("verify: ", verify)

        const removeAllItems = await AddToCart.findOneAndUpdate({userId: req.user._id}, {
            items : [] 
        })

        res.status(200).json({message : "Payment was Successful"})

    } catch (err) {

        res.status(500).json({ message : "Server Error", error : err.message})

    }

})

module.exports = router