const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// sub Schema
const ProductOrder = require("../model/ProductOrder.model").Schema;
const User = require("../model/User.model").Schema;

const OrderSchema = new Schema({
  timeOrder: {
    type: Date,
    default: Date.now(),
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  productOrder: [ProductOrder],
  totalPayment: {
    type: Number,
    default: 0,
  },
  user: [
    {
      type: mongoose.Shema.ObjectId,
      ref: "User",
    },
  ],
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
module.export = Order;
