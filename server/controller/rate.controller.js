const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandle');
const ResponseError = require('../utils/responseError');

const Product = require('../model/Product.model');
const RateProduct = require('../model/RateProduct.model');

exports.addRating = asyncHandler(async(req, res, next) => {

    const productId = req.params.id;
    const userId = req.user;

    const { title, content, rate } = req.body;

    RateProduct.create({
        title,
        content,
        rate,
        product: productId,
        user: userId,
    })

    res.status(200).send({
        success: true,
        message: 'rate complete',
    });

});

exports.getRatings = asyncHandler(async(req, res, next) => {

    // let ObjectId = mongoose.Types.ObjectId;

    const productId = req.params.id;

    console.log(productId);

    // const rates = await RateProduct.aggregate([{
    //     $match: { product: `${productId}` }
    // }])

    const rates = await RateProduct.find({ product: productId });

    console.log(rates);
    res.status(200).send({
        success: true,
        rates: rates,
    })
});

exports.getSingleRating = asyncHandler(async(req, res, next) => {

    const productId = req.params;

});