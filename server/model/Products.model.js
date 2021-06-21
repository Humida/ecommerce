const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  quantity: {
    type: Number,
    default: null,
  },
  trandemark: {
    type: String,
    default: null,
  },
  nameproduct: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  quantitySold: {
    type: Number,
    default: null,
  },
  voucher: {
    type: String,
    default: null,
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

const product = mongoose.model("product", productSchema);
module.exports = product;
