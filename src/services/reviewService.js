const Review = require("../models/Review");

const getAllProductReviews = async (product) => {
    return await Review.find({ product }).populate('user', 'name');
};

const getReviewById = async (id) => {
    return await Review.findById(id);
};

const createReview = async (data) => {
    const review = new Review(data);
    return await review.save();
};

const updateReview = async (data) => {
    const { id, ...reviewData } = data;
    return await Review.findByIdAndUpdate(id, reviewData, { new: true });
};

const deleteReview = async (id) => {
    return await Review.findByIdAndDelete(id);
};

module.exports = {
    getAllProductReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
