const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../model/User.model");
const Product = require("./Product.model");

const VoucherSchema = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  voucherName: {
    type: String,
  },
  forProduct: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  forUser: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const Voucher = mongoose.model("Voucher", VoucherSchema);

module.exports = Voucher;
