const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    rate: {
        type: Number,
    },
    voucher: {
        type: String,
    },
    detail: {
        type: String,
    },
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