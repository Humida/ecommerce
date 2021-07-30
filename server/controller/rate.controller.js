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

exports.updateRating = asyncHandler(async(req, res, next) => {

    const rateId = req.params.id;
    const data = req.body;
    const rate = await RateProduct.findOne({ _id: rateid });

    if (rate.user._id.toString() !== req.user._id && req.user.role !== 'admin') {

        return next(new ResponseError(`user is not authorized to update rate`), 401);

    }

    const rateUpdate = await RateProduct
        .findOneAndUpdate({ _id: rateId }, { $set: data }, { new: true });

    if (!rate) {

        return next(new ResponseError(`can not found rate with id : ${id}`), 404);
    }

    res.status(200).send({
        success: true,
        rate: rateUpdate,
    })

});

exports.deleteRating = asyncHandler(async(req, res, next) => {

    const rateId = req.params.id;

    const rate = await RateProduct.findOne({ _id: rateId });

    if (!rate) {

        return next(new ResponseError(`can not found rate with id : ${rateId}`, 404));

    }

    if (rate.user.toString() !== req.user._id && req.user.role !== "admin") {

        return next(new ResponseError(`user is not authorized to detele rate`), 401);

    }

    await rate.remove();

    res.status(200).send({
        success: true,
        message: `delete complete with rate id : ${rateId}`,
    })
})