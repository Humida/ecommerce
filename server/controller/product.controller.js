const asyncHandler = require("../middleware/asyncHandle");
const queryString = require('querystring');
const Product = require("../model/Product.model");
const ResponseError = require("../utils/responseError");


// @desc      add product
// @route     post /product/add
// @access    private role admin

exports.createProduct = asyncHandler(async(req, res, next) => {
    const {

        quantity,
        tradeMark,
        nameProduct,
        price,
        classify,
        quantitySold,
        type

    } = req.body;


    const host = req.headers.host;

    const photos = req.files.map((file) => {

        return `$http://${host}/public/image/` + file.filename;

    });

    const product = await Product.create({
        quantity,
        tradeMark,
        nameProduct,
        price,
        classify,
        quantitySold,
        type,
        images,
    });

    res.status(200).send({
        success: true,
        product
    });

});

// @desc      update product
// @route     post /product/:id/update
// @access    private role admin

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


// @desc      query product
// @route     get /product/query
// @access    public

exports.queryProducts = asyncHandler(async(req, res, next) => {
    let query = {...req.query };
    // filter

    let excludedQuery = ['sort', 'page', 'limit', 'select'];
    excludedQuery.forEach((element) => delete query[element]);
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    // sort

    let sort = req.query.sort;
    if (sort) {
        sort = sort.split(',').join(' ');
    }
    if (!sort) sort = {};

    // select field

    let select = req.query.select;
    console.log(select);
    if (select) {
        select = select.split(',').join(' ');
    }
    if (!select) select = '';

    // paginate
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    await Product
        .find({})
        .sort('-price -quantity')
        .skip(page * limit - limit)
        .limit(limit)
        .select(select)
        .exec(async(err, products) => {

            if (err)(next(new ResponseError('error database', 400)));

            const count = await Product.count();

            const result = {
                products: products,
                currentPage: page,
                pages: Math.ceil(count / limit),
            };

            res.status(200).send(result);
        });

});

// @desc      delete product
// @route     delete /product/:id/delete
// @access    private role admin

exports.deleteProduct = asyncHandler(async(req, res, next) => {

    const id = req.body.id;

    Product.findOneAndDelete({ _id: id });

    res.status(200).send({
        success: true,
        message: 'detete complete',
    });

});

// @desc      get single product
// @route     get /product/:id
// @access    public

exports.getProduct = asyncHandler(async(req, res, next) => {

    let id = req.params.id;

    console.log(id);

    const product = await Product.findOne({ _id: id });

    console.log(product);

    if (!product) {

        return next(new ResponseError(`Can not found product with id : ${id}`, 404));

    }
    res.status(200).send({
        success: true,
        product: product,
        user: req.user,
    });
});