const Product = require("../model/Product.model");
module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const data = Object.assign({}, req.body);
      const product = new Product(data);
      await product.save();
      res.send(product);
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const data = Object.assign({}, req.body).data;
      const id = req.body.id;
      const product = await Porduct.findByIdAndUpdate({ _id: id }, data);
      await product.save();
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const conditionQuery = req.body;
      const pagination = conditionQuery.pagination;
      const page = parseInt(pagination.page);
      const limit = parseInt(pagination.limit);
      const listProduct = await Product.find(conditionQuery.type);
      const filterProduct = await Product.find(conditionQuery.type)
        .sort(conditionQuery.sort)
        .skip(page * limit - limit)
        .limit(limit);

      const amountProducts = listProduct.length;

      const result = {
        products: filterProduct,
        amount: amountProducts,
      };

      res.send(result);
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const id = req.body.id;
      Product.findOneAndDelete({ _id: id });
    } catch (error) {
      console.log(error);
    }
  },
};
