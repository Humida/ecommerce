const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductOrderSchema = new Schema({
  quantity: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: null,
  },
  size: {
    type: Number,
    default: null,
  },
  tradeMark: {
    type: String,
    default: null,
  },
  nameProduct: {
    type: String,
    default: null,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);

module.exports = ProductOrder;
