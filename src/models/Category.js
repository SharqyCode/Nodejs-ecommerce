const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Must provide name for Category"], unique: true, trim: true },
        slug: { type: String, unique: true, lowercase: true },
        description: { type: String },
        parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    },
    { timestamps: true }
);

categorySchema.pre("save", async function (next) {
    if (!this.isModified("name")) return next(); // only generate on new or name change

    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check for existing slugs
    while (await mongoose.models.Category.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${counter++}`;
    }

    this.slug = uniqueSlug;
    next();
});

module.exports = mongoose.model("Category", categorySchema);
