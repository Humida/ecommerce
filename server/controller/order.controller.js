const ProductOrder = require("../model/ProductOrder.model");

const Order = require("../model/Order.model");
const User = require("../model/User.model");
const Product = require("../model/Product.model");

exports.buy = async(req, res, next) => {
    try {

        const { info, products } = req.body;

        const totalPayment = products.reduce((sum, product) => {
            return sum + product.product.price;
        }, 0);

        const productsModel = products.map((product) => {
            product = new Product(product.product);
            return product;
        });

        const infoOrder = Object.assign({}, info);

        const order = new Order(infoOrder);

        productsModel.forEach((product) => {
            order.productsOrder.push(product);
        });

        const newOrder = await order.save();

        if (newOrder === order) res.status(200).send("ok");


    } catch (err) {

        next(err);

    }
}