const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RateProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Objectid,
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
  commentReply: {
    type: Array,
    default: [],
  },
});

const RateProduct = mongoose.model("RateProduct", RateProductSchema);

module.exports = RateProduct;
