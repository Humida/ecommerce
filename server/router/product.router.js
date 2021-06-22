const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.post("/add", productController.createProduct);

router.get("/get", productController.getProduct);

module.exports = router;
