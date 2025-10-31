const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../src/models/Category"); // adjust path if needed
const connectDB = require("../src/config/db");

dotenv.config();


const categoriesData = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Automotive",
    "Pet Supplies",
    "Groceries",
];

const seedCategories = async () => {
    try {
        await connectDB()
        console.log("Connected to MongoDB");

        await Category.deleteMany();
        console.log("Cleared old categories");

        // Step 1: Create parent categories
        const parentCategories = [];
        for (const name of categoriesData) {
            const category = new Category({
                name,
                description: `${name} products and accessories`,
            });
            await category.save();
            parentCategories.push(category);
        }

        console.log(`✅ Seeded ${parentCategories.length} parent`);
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedCategories();
