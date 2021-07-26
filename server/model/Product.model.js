const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const RateProduct = require("./RateProduct.model").schema;

const RateProductSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    rate: {
        type: Number,
        require: [true, 'please add a rate (from 1 to 5 star)'],
        default: 5,
    },
    comment: {
        type: String,
        maxlenght: [500, 'comment can not be more than 500 character'],
    },
});

const PropertiesProduct = new Schema({
    images: {
        type: Array,
        default: [],
    },
    size: {
        type: Number,
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
    },
});

const ProductSchema = new Schema({
    quantity: {
        type: Number,
        require: [true, 'please add quantity product']
    },
    images: {
        type: Array,
        default: ["http://placehold.jp/500x500.png"],
    },
    properties: [PropertiesProduct],

    quantitySold: {
        type: Number,
        default: 0,
    },
    tradeMark: {
        type: String,
        required: [true, 'please add a trade mark'],
    },
    nameProduct: {
        type: String,
        required: [true, 'please add a name product'],
        unique: true,
    },
    classify: {
        type: String,
        enum: ['shirt', 'trouser'],
    },
    price: {
        type: Number,
        required: [true, 'please add a price'],
    },
    type: {
        type: String,
        required: [true, 'please add a type'],
    },
    voucher: {
        type: String,
    },
    detail: {
        type: String,
    },
    rate: [RateProductSchema],
    deleteSoft: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;