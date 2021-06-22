const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductOrderSchema = new Schema({
  quantity: {
    type: Number,
    default: 1,
  },
  trandemark: {
    type: String,
    default: null,
  },
  nameproduct: {
    type: String,
    default: null,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);

module.epxorts = ProductOrder;
