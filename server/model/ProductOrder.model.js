const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productOrderSchema = new Schema({
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

const productOrder = mongoose.model("productOrder", productOrderSchema);

module.epxorts = productOrder;
