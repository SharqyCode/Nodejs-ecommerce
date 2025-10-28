const express = require("express");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use(`/api/users`, userRoutes);
router.use('/api/orders', orderRoutes);

module.exports = router;
