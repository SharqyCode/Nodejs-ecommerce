const express = require("express");
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductBySlug,
} = require("../controllers/productController");
const { getProductById } = require("../services/productService");

const router = express.Router();

router.route("/")
    .get(getProducts)
    .post(createProduct);

router.route("/:id")
    .put(updateProduct)
    .delete(deleteProduct);
// .get(getProductById)
router.route("/:slug")
    .get(getProductBySlug)
// .put(updateProduct)
// .delete(deleteProduct);

module.exports = router;
