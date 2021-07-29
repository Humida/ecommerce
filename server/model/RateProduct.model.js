const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// relation

const User = require('../model/User.model');
const Product = require('../model/Product.model');

const RateProductSchema = new Schema({

    rate: {
        type: Number,
        require: [true, "please add a rate (from 1 to 5 star)"],
        default: 5,
    },
    title: {
        type: String,
        maxlenght: [100, "title can not be more than 100 character"],
    },
    content: {
        type: String,
        maxlenght: [500, "comment can not be more than 500 character"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    }
});

RateProductSchema.statics.getAverageRating = async function(productId) {

    const obj = await this.aggregate([{

        $match: { product: productId }

    }, {
        $group: {
            _id: '$product',
            averageRating: { $avg: '$rate' }
        }
    }]);


    try {
        await this.model("Product").findByIdAndUpdate(productId, {
            rate: obj[0].averageRating
        });

    } catch (error) {
        throw error;
    }
}

RateProductSchema.post("save", function() {

    this.constructor.getAverageRating(this.product);

});

RateProductSchema.pre('remove', function() {

    this.constructor.getAverageRating(this.product);

});

module.exports = mongoose.model('RateProduct', RateProductSchema);