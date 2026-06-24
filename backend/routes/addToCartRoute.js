const router = require("express").Router();
const AddToCart = require("../models/addToCart.js");
const Product = require("../models/product.js");
const Category = require('../models/category.js');
const upload = require("../middleware/upload.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/add", protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id

        let cart = await AddToCart.findOne({ userId });

        if (!cart) {

            cart = await AddToCart.create({
                userId: userId,
                items: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            })

        } else {

            const itemIdx = cart.items.findIndex((item) => item.product.toString() === productId)

            if (itemIdx > -1) {

                cart.items[itemIdx].quantity += quantity

            } else {

                cart.items.push({
                    product: productId,
                    quantity
                })


            }

            await cart.save()

        }

        res.status(200).json({ message: "Category added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding category" });
    }
});

router.get('/get-cart', protect, async (req, res) => {
    try {

        const userId = req.user._id;
        const cart = await AddToCart.findOne({ userId }).populate("items.product").populate(
            {
                path: "items.product",
                populate: {
                    path: "categories",
                    model: "Category"
                }
            }
        )

        if (!cart) {

            return res.status(404).json({ message: "Cart Not found" });
        }


        res.status(200).json({
            cartItems: cart.items
        })

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })

    }
})

router.put('/update-quantity', protect, async (req, res) => {

    try {

        const { productId, quantity } = req.body;
        const userId = req.user._id;

        let cart = await AddToCart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIdx = cart.items.findIndex((item) => item.product && item.product.toString() === productId)
        if (itemIdx > -1) {

            if (quantity === 0) {

                cart.items.splice(itemIdx, 1);
                await cart.save()

            } else {

                cart.items[itemIdx].quantity = quantity;
                await cart.save()
            }

        }

        res.status(200).json({ message: "Product quantity updated" })

    } catch (err) {

        res.status(500).json({ message: "Server Error" });

    }

})

router.put('/clear-cart', protect, async (req,res)=> {

    try{

        const userId = req.user._id;
        await AddToCart.deleteMany({userId})

        res.status(200).json({
            message : "Cart cleared successfully"
        })


    } catch (err) {

        res.status(500).json({
            message : "Server Error"
        })

    }

})

router.delete('/delete/:id', protect, async (req, res) => {

    try {

        const { id } = req.params;
        const userId = req.user._id;

        let cart = await AddToCart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const itemIdx = cart.items.findIndex((item) => item._id.toString() === id)

        if (itemIdx > -1) {
            cart.items.splice(itemIdx, 1);
            await cart.save();
        }

        res.status(200).json({
            message: "Item removed from cart"
        })

    } catch (err) {

        res.status(500).json({
            message: "Sever Error"
        })

    }

})


module.exports = router;