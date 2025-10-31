const express = require("express");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const categoryRoutes = require("./categoryRoutes");
const reviewRoutes = require("./reviewRoutes");
const stripe = require("stripe")("sk_test_51SOD7lDylaFolDrPtJnWIrwXvOJS4sJ4SXIDJELhBx1bMkQboG507iHcjGcnBaItM7zezjY7rf0HBRdQ3FbZCHOz00a8jcq4SO")
const router = express.Router();

router.use("/products", productRoutes);
router.use(`/users`, userRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/reviews', reviewRoutes);

router.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body; // ✅ fix here
    const lineItems = products.map(product => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.thumbnail]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems, // ✅ note: use snake_case
            mode: "payment",
            success_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/cancel"
        });
        res.json({ url: session.url }); // ✅ Stripe now gives a checkout URL directly
    } catch (err) {
        console.error("Stripe error:", err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
