const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateProduct = require("./RateProduct.model");

const ProductSchema = new Schema({
  quantity: {
    type: Number,
    default: null,
  },
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
  rate: [RateProduct],
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
