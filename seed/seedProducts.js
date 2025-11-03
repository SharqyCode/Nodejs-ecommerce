const mongoose = require("mongoose");
const dotenv = require("dotenv");
const slugify = require("slugify");
const Product = require("../src/models/Product"); // adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

const categories = {
    "Electronics": new mongoose.Types.ObjectId("69024301973e0a5edf6acd89"),
    "Fashion": new mongoose.Types.ObjectId("69024301973e0a5edf6acd8c"),
    "Home & Kitchen": new mongoose.Types.ObjectId("69024302973e0a5edf6acd8f"),
    "Beauty & Health": new mongoose.Types.ObjectId("69024302973e0a5edf6acd92"),
    "Sports & Outdoors": new mongoose.Types.ObjectId("69024302973e0a5edf6acd95"),
    "Books": new mongoose.Types.ObjectId("69024303973e0a5edf6acd98"),
    "Toys & Games": new mongoose.Types.ObjectId("69024303973e0a5edf6acd9b"),
    "Automotive": new mongoose.Types.ObjectId("69024303973e0a5edf6acd9e"),
    "Pet Supplies": new mongoose.Types.ObjectId("69024303973e0a5edf6acda1"),
    "Groceries": new mongoose.Types.ObjectId("69024304973e0a5edf6acda4"),
};

const productsByCategory = [
    { name: "Photon Camera Pro", category: categories["Electronics"], price: 1200, description: "AI-powered 48MP camera", isFeatured: true },
    { name: "Titan Smartwatch X", category: categories["Electronics"], price: 220, description: "Tracks steps and sleep", isFeatured: true },
    { name: "Aether Leather Jacket", category: categories["Fashion"], price: 300, description: "Stylish jacket", isFeatured: false },
    { name: "Velora Running Shoes", category: categories["Fashion"], price: 110, description: "Breathable sports shoes", isFeatured: true },
    { name: "Luna Air Purifier", category: categories["Home & Kitchen"], price: 350, description: "HEPA filter purifier", isFeatured: false },
    { name: "AeroBreeze Fan", category: categories["Home & Kitchen"], price: 90, description: "Energy-efficient fan", isFeatured: false },
    { name: "GlowSkin Serum", category: categories["Beauty & Health"], price: 40, description: "Vitamin C serum", isFeatured: true },
    { name: "Zen Electric Toothbrush", category: categories["Beauty & Health"], price: 70, description: "Rechargeable sonic toothbrush", isFeatured: false },
    { name: "PowerBlitz Dumbbells", category: categories["Sports & Outdoors"], price: 300, description: "Smart dumbbells", isFeatured: false },
    { name: "AeroCycle Helmet", category: categories["Sports & Outdoors"], price: 95, description: "Lightweight helmet", isFeatured: true },
    { name: "The Quantum Age", category: categories["Books"], price: 25, description: "Journey into physics", isFeatured: false },
    { name: "The Code Whisperer", category: categories["Books"], price: 40, description: "Clean code principles", isFeatured: true },
    { name: "Cosmic Storybook Set", category: categories["Toys & Games"], price: 80, description: "Kids educational books", isFeatured: false },
    { name: "RoboBuddy", category: categories["Toys & Games"], price: 60, description: "Interactive robot toy", isFeatured: true },
    { name: "AutoMate Car Vacuum", category: categories["Automotive"], price: 65, description: "Cordless car vacuum", isFeatured: false },
    { name: "DriveSense Dash Cam", category: categories["Automotive"], price: 120, description: "1080p night vision dashcam", isFeatured: true },
    { name: "PetPal Feeder 2.0", category: categories["Pet Supplies"], price: 120, description: "Smart pet feeder", isFeatured: true },
    { name: "FurEase Brush", category: categories["Pet Supplies"], price: 25, description: "Gentle pet brush", isFeatured: false },
    { name: "Organic Arabica Coffee Beans", category: categories["Groceries"], price: 18, description: "Freshly roasted beans", isFeatured: true },
    { name: "Nature’s Harvest Honey", category: categories["Groceries"], price: 12, description: "Pure organic honey", isFeatured: false },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await Product.deleteMany();
        console.log("🧹 Cleared old products");

        // Generate unique slugs and full product data
        const productsToInsert = productsByCategory.map((p, i) => ({
            ...p,
            slug: slugify(`${p.name}-${i + 1}`, { lower: true, strict: true }),
            sku: `${p.name.substring(0, 3).toUpperCase()}-${Date.now()}`,
            rating: 0,
            colors: ["Black", "White", "Gray"].slice(0, Math.floor(Math.random() * 3) + 1),
            sizes: [],
            dimensions: { length: null, width: null, height: null },
            inStock: true,
            stockQuantity: Math.floor(Math.random() * 200) + 10,
        }));

        // Use insertMany with options to run validation + continue on errors
        await Product.insertMany(productsToInsert, { ordered: false, rawResult: true });
        console.log(`🎉 Inserted ${productsToInsert.length} products successfully.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
};

seedProducts();
