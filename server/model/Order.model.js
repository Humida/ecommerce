const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// sub Schema
const ProductOrder = require("../model/ProductOrder.model").schema;
const User = require("../model/User.model").schema;

const OrderSchema = new Schema({
    timeOrder: {
        type: Date,
        default: Date.now(),
    },
    name: {
        type: String,
        required: [true, "Please input name"],
    },
    email: {
        type: String,
        required: [true, "Please input email"],
    },
    phoneNumber: {
        type: String,
        require: [true, 'please add one phone number'],
        match: [],
    },
    address: {
        type: Object,
        require: [true, 'please add a address'],
    },
    productsOrder: [ProductOrder],

    totalPayment: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    deleteSoft: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;