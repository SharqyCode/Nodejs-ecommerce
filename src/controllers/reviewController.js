const reviewService = require("../services/reviewService");

// GET /api/reviews
const getReviews = async (req, res) => {
    try {
        const product = req.params.product;
        const reviews = await reviewService.getAllProductReviews(product);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/reviews/:id
const getReview = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (!review) return res.status(404).json({ message: "review not found" });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/reviews
const createReview = async (req, res) => {
    try {
        console.log(req.body);
        const newReview = await reviewService.createReview(req.body.review);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/reviews/:id
const updateReview = async (req, res) => {
    try {
        const updated = await reviewService.updateReview(req.body);
        if (!updated) return res.status(404).json({ message: "review not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
        const deleted = await reviewService.deleteReview(req.params.id);
        if (!deleted) return res.status(404).json({ message: "review not found" });
        res.status(200).json({ message: "review deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
};
