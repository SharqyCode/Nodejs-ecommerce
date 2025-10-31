const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
// const Category = require("../models/Category")

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Must provide name for Product"], trim: true },
        slug: { type: String, unique: true, lowercase: true },
        description: { type: String, required: [true, "Must provide description for Product"] },
        brand: { type: String },
        sku: { type: String, unique: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        tags: [String],

        price: { type: Number, required: [true, "Must provide price for Product"] },
        discountPrice: { type: Number },
        currency: { type: String, default: "USD" },

        inStock: { type: Boolean, default: true },
        stockQuantity: { type: Number, default: 0 },

        images: [String],
        thumbnail: String,

        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },

        colors: [String],
        sizes: [String],
        weight: Number,
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
        },

        isFeatured: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

productSchema.pre("save", async function (next) {
    if (!this.isModified("name")) return next(); // only generate on new or name change

    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check for existing slugs
    while (await mongoose.models.Product.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${counter++}`;
    }

    this.slug = uniqueSlug;
    next();
});

productSchema.pre("save", function (next) {
    if (!this.sku) {
        this.sku = `${this.name.substring(0, 3).toUpperCase()}-${Date.now()}`;
    }
    next();
});


// productSchema.pre("save", async function (next) {

//     next()
// }
// );


module.exports = mongoose.model("Product", productSchema);
