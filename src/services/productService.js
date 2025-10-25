const Product = require("../models/Product");

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
