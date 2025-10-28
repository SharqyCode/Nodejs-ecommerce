const Category = require("../models/Category");

const getAllCategories = async () => {
    return await Category.find();
};

const getCategoryBySlug = async (slug) => {
    return await Category.find({ slug });
};

const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

const updateCategory = async (slug, data) => {
    return await Category.findOneAndUpdate({ slug }, data, { new: true });
};

const deleteCategory = async (slug) => {
    return await Category.findOneAndDelete({ slug });
};

module.exports = {
    getAllCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
};
