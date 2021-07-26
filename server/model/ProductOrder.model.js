const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductOrderSchema = new Schema({
    quantity: {
        type: Number,
        default: 1,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    size: {
        type: Number,
        require: [true, 'please add a size'],
    },
    tradeMark: {
        type: String,
        require: [true, 'please add a trade mark'],
    },
    nameProduct: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

const ProductOrder = mongoose.model("ProductOrder", ProductOrderSchema);

module.exports = ProductOrder;