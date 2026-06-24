const router = require("express").Router();
const Product = require("../models/product.js");
const upload = require("../middleware/upload.js");
const cloudinary = require("cloudinary").v2;
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const extractPublicId = (imageUrl) => {
    if (!imageUrl) return null;
    const parts = imageUrl.split('/');
    const fileWithExtension = parts.pop(); // e.g., "my-image.jpg"
    const folder = parts.pop(); // e.g., "ecommerce_products"
    const filename = fileWithExtension.split('.')[0]; // e.g., "my-image"
    return `${folder}/${filename}`;
};


router.post("/add-product", protect, isAdmin, upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, categories } = req.body;
        let imageUrl = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce_products",
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const product = new Product({
            productName: name,
            image: imageUrl,
            description,
            price,
            categories
        });

        await product.save();

        res.status(200).json({ message: "Product added successfully" });

    } catch (err) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: "Error adding product" });
    }
});


router.put("/edit-product/:id", protect, isAdmin, upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categories } = req.body;

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: "Product is not found" });
        }

        let imageToSave = existingProduct.image;

        if (req.file) {
            // 1. Delete the OLD image from Cloudinary first
            if (existingProduct.image) {
                const oldPublicId = extractPublicId(existingProduct.image);
                if (oldPublicId) {
                    await cloudinary.uploader.destroy(oldPublicId);
                }
            }

            // 2. Upload the NEW image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce_products",
            });
            
            imageToSave = result.secure_url; 
            fs.unlinkSync(req.file.path);
        }

        const updateProduct = {
            productName: name,
            image: imageToSave,
            description: description,
            price: price,
            categories: categories
        };

        const update = await Product.findByIdAndUpdate(id, updateProduct);

        if (!update) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully" });

    } catch (err) {

        res.status(500).json({ message: "Error updating product" });
    }

});


router.get("/list-products", async (req, res) => {
    try {
        const productList = await Product.find().populate("categories")


        res.status(200).json({ products: productList });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});


router.delete("/delete-product/:id", protect, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = extractPublicId(product.image);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted Successfully !" });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {

        const product = await Product.findById(id);

        res.status(200).json({ productList: product });

    } catch (err) {

        res.status(500).json({ message: "Server Error" });

    }
});


module.exports = router;