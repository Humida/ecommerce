const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductOrderSchema = require("../model/ProductOrder.model").schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  avatar: {
    type: Buffer,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  productsOrder: [ProductOrderSchema],
  deleteSoft: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
