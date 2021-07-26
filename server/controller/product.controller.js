const asyncHandler = require("../middleware/asyncHandle");
const queryString = require('querystring');
const Product = require("../model/Product.model");
const ResponseError = require("../utils/responseError");


exports.createProduct = asyncHandler(async(req, res, next) => {

    const { quantity, tradeMark, nameProduct, price, classify, quantitySold, type } = req.body;

    console.log(req.body);
    const product = await Product.create({
        quantity,
        tradeMark,
        nameProduct,
        price,
        classify,
        quantitySold,
        type,
    });

    res.status(200).send({
        success: true,
        product
    });

});

exports.updateProduct = asyncHandler(async(req, res, next) => {

    const data = Object.assign({}, req.body).data;
    const id = req.body.id;
    const product = await Product.findByIdAndUpdate({ _id: id }, data);
    await product.save();

    res.status(200).send({

        success: true,
        message: 'update complete',

    })

});

exports.queryProducts = asyncHandler(async(req, res, next) => {

    let query = {...req.query };

    // filter

    let excludedQuery = ['sort', 'page', 'limit', 'select'];

    excludedQuery.forEach((element) => delete query[element]);

    let queryStr = JSON.stringify(query);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // console.log(queryStr);

    // sort
    let sortProduct;
    let sort = req.query.sort;

    sort = sort.split(',');

    sort.map((item) => {
        if (item.includes('-')) {
            return { item: -1 };
        } else {
            return { item: 1 }
        }

    });



    console.log('aaa', sort);

    // select field



    // paginate


    // const pagination = req.query.pagination;
    // const page = parseInt(pagination.page);
    // const limit = parseInt(pagination.limit);



    await Product
        .find({})
        .sort('-price -quantity')
        .exec(async(err, products) => {
            if (err)(next(new ResponseError('error database', 400)));

            const count = await Product.count();

            const result = {
                products: products,
                count: count,
            };
            res.status(200).send(result);
        });

});

exports.deleteProduct = asyncHandler(async(req, res, next) => {

    const id = req.body.id;

    Product.findOneAndDelete({ _id: id });

    res.status(200).send({
        success: true,
        message: 'detete complete',
    });

});

exports.getProduct = asyncHandler(async(req, res, next) => {

    let id = req.params.id;

    const products = await Product.find({ _id: id });

    if (!products) {

        next(new ErrorResponse(`Can not found product with id : ${id}`, 404));

    }

    res.status(200).send({
        success: true,
        product: products,
        user: req.user,
    });

});