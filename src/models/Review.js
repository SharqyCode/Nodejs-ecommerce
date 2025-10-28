const mongoose = require("mongoose");
const Product = require("./Product");

const reviewSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Must provide userId for Review"] },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: [true, "Must provide productId for Review"] },
        rating: { type: Number, required: [true, "Must provide rating for Review"], min: 1, max: 5 },
        comment: { type: String, trim: true },
    },
    { timestamps: true }
);

reviewSchema.statics.updateProductSummary = async function (productId) {
    const stats = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: "$product",
                avgRating: { $avg: "$rating" },
                numReviews: { $sum: 1 },
            },
        },
    ]);

    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            rating: stats[0].avgRating,
            numReviews: stats[0].numReviews,
        });
    } else {
        // No reviews left
        await Product.findByIdAndUpdate(productId, {
            rating: 0,
            numReviews: 0,
        });
    }
};

// After saving a new or updated review
reviewSchema.post("save", async function () {
    await this.constructor.updateProductSummary(this.product);
});

// After deleting a review
reviewSchema.post("findOneAndDelete", async function (doc) {
    if (doc) await doc.constructor.updateProductSummary(doc.product);
});

module.exports = mongoose.model("Review", reviewSchema);