const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.post("/get", productController.getProduct);

// get trending product

// router.get("/get/trending", productController.getTrending);

module.exports = router;
