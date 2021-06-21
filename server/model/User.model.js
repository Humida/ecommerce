const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  avatar: {
    type: Buller,
  },
  email: {
    type: String,
    unique: true,
    default: null,
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  productsOrder: [productOrder],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
