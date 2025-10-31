const Category = require("../models/Category");
const Product = require("../models/Product");

const getAllProducts = async () => {
    return await Product.find().populate('category', 'name parentCategory');
};

const getProductById = async (id) => {
    return await Product.findById(id).populate('category', 'name parentCategory');
};

const createProduct = async (data) => {

    const product = new Product(data);
    return await product.save();
};

const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true }).populate('category', 'name parentCategory');;
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id).populate('category', 'name parentCategory');;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
