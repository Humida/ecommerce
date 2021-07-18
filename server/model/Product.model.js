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
    default: 5,
  },
  comment: {
    type: String,
    default: null,
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
    default: null,
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
    default: null,
  },
  nameProduct: {
    type: String,
    default: null,
  },
  classify: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  voucher: {
    type: String,
    default: null,
  },
  detail: {
    type: String,
    default: null,
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
