const Product = require("../model/Product.model");

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const images = req.files.map((image) => {
        const hostname = "http://localhost:4000/image/";
        const path = hostname.concat(image.filename);
        return path;
      });
      const data = Object.assign({}, req.body, { images: images });
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
      const product = await Product.findByIdAndUpdate({ _id: id }, data);
      await product.save();
    } catch (error) {
      console.log(error);
    }
  },

  getProduct: async (req, res, next) => {
    try {
      // query parameter
      const pagination = req.query;
      const page = parseInt(pagination.page);
      const limit = parseInt(pagination.limit);

      // body request
      const conditionQuery = req.body;
      const type = conditionQuery.type;
      const sort = conditionQuery.sort;

      console.log(req.body);

      await Product.find(type)
        .sort(sort)
        .skip(page * limit - limit)
        .limit(limit)
        .exec((err, products) => {
          if (err) return res.send(400).send("Error");
          const count = products.length;
          const result = {
            products: products,
            current: page,
            pages: Math.ceil(count / limit),
          };
          res.status(200).send(result);
        });
    } catch (error) {
      throw error;
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
