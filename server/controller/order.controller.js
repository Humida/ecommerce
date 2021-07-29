const ProductOrder = require("../model/ProductOrder.model");
const Order = require("../model/Order.model");
const User = require("../model/User.model");
const Product = require("../model/Product.model");
const asyncHandler = require('../middleware/asyncHandle');
const ResponseError = require('../utils/responseError');

exports.buyWithoutAccount = asyncHandler(async(req, res, next) => {

    const { info, products } = req.body;


    const totalPayment = products.reduce((sum, product) => {
        return sum + product.price;
    }, 0);

    const productsModel = products.map((product) => {
        product = new Product(product);
        return product;
    });

    const infoOrder = Object.assign({}, info, { totalPayment });

    const order = new Order(infoOrder);


    productsModel.forEach((product) => {

        order.productsOrder.push(product);

    });

    await order.save();

    res.status(200).send({
        success: true,
        message: 'order complete',
    })

});


exports.buyWithAccount = asyncHandler(async(req, res, next) => {

    console.log(req.user);
    console.log(req.body);
    const id = req.body.id;
    const { info, products } = req.body;

    const totalPayment = products.reduce((sum, product) => {
        return sum + product.price;
    }, 0);

    const productsModel = products.map((product) => {
        product = new Product(product.product);
        return product;
    });

    const infoOrder = Object.assign({}, info, { totalPayment }, { user: id });

    const order = new Order(infoOrder);

    productsModel.forEach((product) => {
        order.productsOrder.push(product);
    });

    await order.save();

    res.status(200).send({
        success: true,
        message: "order complete",
    });

});