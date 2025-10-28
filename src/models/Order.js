// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user'],
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: [true, 'Order item must have a product'],
            },
            quantity: {
                type: Number,
                required: [true, 'Order item must have a quantity'],
                min: 1,
            },
            price: {
                type: Number,
                required: [true, 'Order item must have a price'],
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, 'Order must have a total price'],
    },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
