const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voucherSchema = new Schema({
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  voucherName: {
    type: String,
  },
  forProduct: {},
  forUser: {},
});

const voucher = mongoose.model("voucher", voucherSchema);

module.exports = voucher;
