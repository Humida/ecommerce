const ProductOrder = require("../model/ProductOrder.model");

const Order = require("../model/Order.model");
const User = require("../model/User.model");
const Product = require("../model/Product.model");

module.exports = {
  buy: async (req, res, next) => {
    try {
      const { info, products } = req.body;

      const totalPayment = products.reduce((sum, product) => {
        return sum + product.product.price;
      }, 0);
      console.log(totalPayment);

      const productsModel = products.map((product) => {
        product = new Product(product.product);
        return product;
      });

      const infoOrder = Object.assign({}, info, { totalPayment: totalPayment });

      const order = new Order(infoOrder);

      productsModel.forEach((product) => {
        order.productsOrder.push(product);
      });

      const newOrder = await order.save();

      if (newOrder === order) res.status(200).send("ok");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  deleteOrder: async (req, res, next) => {
    const id = req.body.id;
    Order.findByIdAndDelete(id);
    res.status = 200;
  },
  deleteSort: async (req, res, next) => {
    const id = req.body.id;
    await Product.findOneAndUpdate({ _id: id }, { deleteSort: true });
    res.status(200).send("delete sort");
  },
};
