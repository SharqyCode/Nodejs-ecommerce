const productService = require("../services/productService");

// GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/products/:id
const getProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/products
const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const updated = await productService.updateProduct(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
