const ProductOrder = require("../model/ProductOrder.model");
const Order = require("../model/Order.model");
const User = require("../model/User.model");
const Product = require("../model/Product.model");

module.exports = {
  buy: async (req, res, next) => {
    try {
      const userId = req.body.id;
      const listProductOrder = req.body.products.map((product) => {
        let productOrder = new ProductOrder(product);
        return productOrder;
      });
      const infoOrder = Object.assign({}, req.body.info);
      const order = new Order(infoOrder);
      listProductOrder.forEach((product) => {
        order.productsOrder.push(product);
      });
      await order.save();

      if (!userId) return res.send("Order Success");

      const user = await User.findOne({ _id: id });

      user.productsOrder.push(order);

      await user.save();

      res.send("order Success");
    } catch (err) {
      console.log(err);
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
    res.status = 200;
  },
};
