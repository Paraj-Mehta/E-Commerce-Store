const router = require("express").Router();
const Category = require("../models/category.js");
const upload = require("../middleware/upload.js");
const cloudinary = require("cloudinary").v2;
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// Ensure the variable names match your .env exactly
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const extractPublicId = (imageUrl) => {
    if (!imageUrl) return null;
    const parts = imageUrl.split('/');
    const fileWithExtension = parts.pop();
    const folder = parts.pop();
    const filename = fileWithExtension.split('.')[0];
    return `${folder}/${filename}`;
};

router.post("/add-category", protect, isAdmin, upload.single("image"), async (req, res) => {
    try {
        const { categoryName } = req.body;
        let imageToSave = null; // Changed variable name for clarity


        if (req.file) {
            // 1. Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce_categories",
            });

            // 2. Assign to the correct variable!
            imageToSave = result.secure_url; 

            // 3. Delete the temporary local file
            fs.unlinkSync(req.file.path);
        }

        const category = new Category({ categoryName, image: imageToSave });
        await category.save();

        res.status(200).json({ message: "Category added successfully" });
    } catch (err) {
        
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        console.error(JSON.stringify(err, null, 2));
        res.status(500).json({ message: "Error adding category" });
    }
});

router.put("/edit-category/:id", protect, isAdmin, upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: "Category is not found" });
        }

        let imageToSave = existingCategory.image;

        if (req.file) {
            // 1. Delete OLD image from Cloudinary
            if (existingCategory.image) {
                const oldPublicId = extractPublicId(existingCategory.image);
                if (oldPublicId) {
                    await cloudinary.uploader.destroy(oldPublicId);
                }
            }

            // 2. Upload NEW image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce_categories",
            });

            imageToSave = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const updateCategory = {
            categoryName: categoryName,
            image: imageToSave,
        };

        const update = await Category.findByIdAndUpdate(id, updateCategory, { new: true });

        if (!update) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully" });

    } catch (err) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        console.error(err);
        res.status(500).json({ message: "Error updating category" });
    }
});

router.get("/list-category", async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({ category: categoryList });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/delete-category/:id", protect, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Delete image from Cloudinary
        if (category.image) {
            const publicId = extractPublicId(category.image);
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json({ categoryList: category });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;