const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("../model/User.model");
const Product = require("./Product.model");

const VoucherSchema = new Schema({
    startDate: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
    voucherName: {
        type: String,
        require: true,
        maxlenght: [100, "vocher name can not be more than 100 charactor"],
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    }, ],
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }, ],
});

const Voucher = mongoose.model("Voucher", VoucherSchema);

module.exports = Voucher;