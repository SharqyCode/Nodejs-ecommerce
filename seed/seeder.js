const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("../src/models/Product");
const connectDB = require("../src/config/db");


dotenv.config();
connectDB();

const seedProducts = [
    { name: "T-Shirt", price: 20, category: "Clothing" },
    { name: "Laptop", price: 999, category: "Electronics" },
    { name: "Coffee Mug", price: 10, category: "Home" },
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(seedProducts);
        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();
