const express = require("express");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const categoryRoutes = require("./categoryRoutes");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use(`/users`, userRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
