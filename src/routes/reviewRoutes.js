const express = require('express');
const { getReviews, createReview, getReview, deleteReview, updateReview } = require('../controllers/reviewController');

const router = express().router;

router.route("/:product")
    .get(getReviews)
    .post(createReview);

router.route("/:id")
    .get(getReview)
    .put(updateReview)
    .delete(deleteReview);


module.exports = router