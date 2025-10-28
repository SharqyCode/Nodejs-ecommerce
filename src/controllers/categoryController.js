const categoryService = require("../services/categoryService");

// GET /api/Categories
const getCategories = async (req, res) => {
    try {
        const Categories = await categoryService.getAllCategories();
        res.status(200).json(Categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/Categories/:slug
const getCategory = async (req, res) => {
    try {
        const Category = await categoryService.getCategoryBySlug(req.params.slug);
        if (!Category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(Category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/Categories
const createCategory = async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/Categories/:slug
const updateCategory = async (req, res) => {
    try {
        const updated = await categoryService.updateCategory(req.params.slug, req.body);
        if (!updated) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/Categories/:slug
const deleteCategory = async (req, res) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.slug);
        if (!deleted) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
